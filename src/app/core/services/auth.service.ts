import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User as FirebaseUser,
  UserCredential,
} from '@angular/fire/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  Firestore,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
  DocumentData,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '@core/types/user.type';
import {
  EmailAlreadyInUseException,
  InvalidCredentialsException,
  InvalidUserUIDException,
  UsernameAlreadyInUseException,
} from '@exceptions/auth';

/*
 * This service is used for the entire app's authentication system.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private database: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private user: WritableSignal<User | undefined> = signal(undefined);
  private isReady: WritableSignal<boolean> = signal(false);

  constructor() {
    this.auth.onAuthStateChanged((user: FirebaseUser | null) => {
      // If the user is not authenticated, simply do nothing.
      if (!user) {
        this.isReady.set(true);

        return;
      }

      // Fetch the current user's data if it's authenticated.
      this.fetchCurrentUser(user.uid)
        .then((user: User) => {
          this.user.set(user);
          this.isReady.set(true);
        })
        .catch((e) => {
          console.error(e);
        });
    });
  }

  /**
   * Check if the current user is authenticated.
   *
   * @return Whether the user is authenticated or not.
   */
  public isAuthenticated(): boolean {
    return Boolean(this.auth.currentUser);
  }

  /**
   * Check if there's a user with a given username.
   *
   * @param username
   * @private
   *
   * @return Whether there's a user with the given username.
   */
  private async isUserExistsWithUsername(username: string): Promise<boolean> {
    // Try to fetch a user with the given username.
    const usersRef: CollectionReference = collection(this.database, 'users');
    const userQuery: Query = query(usersRef, where('username', '==', username));
    const userSnapshot: QuerySnapshot = await getDocs(userQuery);

    return userSnapshot.docs.length !== 0;
  }

  /**
   * Sign up a new user using an email address and a password.
   *
   * It will create an authentication user in the FireBase storage.
   * It will also create a new document in the "users" collection with the
   * given firstname and lastname.
   *
   * @param email The user's email address.
   * @param password The user's password.
   * @param firstname The user's firstname.
   * @param lastname The user's lastname.
   * @param username The user's username.
   *
   * @throws {UsernameAlreadyInUseException} If there's already an account
   * with the given username.
   * @throws {EmailAlreadyInUseException} If there's already an account with
   * the given email address.
   */
  public async createUserWithEmailAndPassword(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    username: string,
  ): Promise<void> {
    const isUserExistsWithUsername =
      await this.isUserExistsWithUsername(username);

    if (isUserExistsWithUsername) {
      throw new UsernameAlreadyInUseException(
        'The username ' + username + ' is already taken.',
      );
    }

    try {
      await createUserWithEmailAndPassword(this.auth, email, password).then(
        async (response: UserCredential): Promise<void> => {
          // If the Firebase user creating was successfully, then create the user
          // in the "users" collection, so we can store the user's data, like
          // their username, firstname and lastname.
          if (response.user) {
            try {
              await addDoc(collection(this.database, 'users'), {
                user_uid: response.user.uid,
                username: username,
                profile: {
                  firstname: firstname,
                  lastname: lastname,
                },
                significant_other: '',
                followers: [],
                followings: [],
              });

              // Navigate the user to the home page.
              this.router.navigate(['/']);
            } catch (e) {
              console.error(e);
            }
          } else {
            console.error(
              'There were some error at creating the new user.',
              response,
            );
          }
        },
      );
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/email-already-in-use') {
          throw new EmailAlreadyInUseException(
            'The email address ' + email + ' is already taken.',
          );
        }

        // TODO: Handle other errors, e.g. some network error.
      }
    }
  }

  /**
   * Sign in the user with an email address and a password.
   *
   * @param email The given email address.
   * @param password The given password.
   *
   * @throws {InvalidCredentialsException} If the given email address or
   * password was incorrect.
   */
  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password).then(
        (response: UserCredential) => {
          if (response.user) {
            // If the sign in was succesfull, navigate the user to the home
            // page.
            this.router.navigate(['/']);
          } else {
            console.error('Login failed.');
          }
        },
      );
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/invalid-credential') {
          throw new InvalidCredentialsException(
            'Wrong email address or' + ' password.',
          );

          // TODO: Handle other errors, e.g. some network error.
        }
      }
    }
  }

  /**
   * Sign out the current user.
   */
  public async signOut(): Promise<void> {
    try {
      await this.auth.signOut();

      // Navigate the user to the sign in page.
      this.router.navigate(['/sign-in']);
    } catch (e) {
      // TODO: It will need better error handling.
      console.error(e);
    }
  }

  /**
   * Fetch the currently authenticated user.
   *
   * @param userUID The current user's UID.
   *
   * @returns A 'User' object of the currently authenticated user.
   *
   * @throws {UserNotAuthenticatedException} If there's no user currently
   * authenticated.
   * @throws {InvalidUserUIDException} If there's no user data with the
   * current user's UID.
   */
  private async fetchCurrentUser(userUID: string): Promise<User> {
    // Fetch the user data from the database.
    const usersRef: CollectionReference = collection(this.database, 'users');
    const userQuery: Query = query(usersRef, where('user_uid', '==', userUID));
    const userSnapshot: QuerySnapshot = await getDocs(userQuery);

    // Throw an error when there's no user with the current user's UID.
    if (userSnapshot.docs.length === 0) {
      throw new InvalidUserUIDException(
        "There are no user with the '" + userUID + "' UID.",
      );
    }

    const userDoc: QueryDocumentSnapshot = userSnapshot.docs[0];
    const userData: DocumentData = userDoc.data();

    return {
      id: userDoc.id,
      userUID: userData['user_uid'],
      username: userData['username'],
      profile: userData['profile'],
      significantOther: userData['significant_other'],
      followers: userData['followers'],
      followings: userData['followings'],
    };
  }

  /**
   * Get the current user's data.
   *
   * @returns A 'User' object with the current user's data or undefined if
   * the user's not authenticated.
   */
  public getCurrentUser(): User | undefined {
    return this.user();
  }

  /**
   * @returns Whether the firebase authentication and user data fetching are
   * finished.
   */
  public isAppReady(): boolean {
    return this.isReady();
  }
}
