import { inject, Injectable } from '@angular/core';
import {
  collection,
  CollectionReference,
  Firestore,
  getDocs,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from '@angular/fire/firestore';
import { Rating } from '@core/types/rating.type';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {
  private database: Firestore = inject(Firestore);

  public async fetchRatingsFromUser(userUID: string): Promise<Array<Rating>> {
    const ratingsRef: CollectionReference = collection(
      this.database,
      'ratings',
    );
    const ratingsQuery: Query = query(
      ratingsRef,
      where('created_by.user_uid', '==', userUID),
    );
    const ratingsSnapshot: QuerySnapshot = await getDocs(ratingsQuery);
    const ratingsDocs: Array<QueryDocumentSnapshot> = ratingsSnapshot.docs;

    const ratings: Array<Rating> = [];

    ratingsDocs.forEach((rating: QueryDocumentSnapshot) => {
      const ratingData = rating.data();

      ratings.push({
        locationName: ratingData['location_name'],
        locationAddress: ratingData['loaction_address'],
        date: ratingData['date'],
        dogRating: ratingData['dog_rating'],
        dogNotes: ratingData['dog_notes'],
        bunRating: ratingData['bun_rating'],
        bunNotes: ratingData['bun_notes'],
        sauceRating: ratingData['sauce_rating'],
        sauceNotes: ratingData['sauce_notes'],
        sauceToDogRatioRating: ratingData['sauce_to_dog_ratio_rating'],
        sauceToDogRatioNotes: ratingData['sauce_to_dog_ration_notes'],
        dogToBunRatioRating: ratingData['dog_to_bun_ratio_rating'],
        dogToBunRatioNotes: ratingData['dog_to_bun_ratio_notes'],
        overallTasteRating: ratingData['overall_taste_rating'],
        overallTasteNotes: ratingData['overall_taste_notes'],
        customerServiceRating: ratingData['customer_service_rating'],
        customerServiceNotes: ratingData['customer_service_notes'],
        overallExperienceRating: ratingData['overall_experience_rating'],
        overallExperienceNotes: ratingData['overall_experience_notes'],
        score: ratingData['score'],
        createBy: {
          userUID: ratingData['created_by']['user_uid'],
          timestamp: ratingData['created_by']['timestamp'],
        },
      });
    });

    return ratings;
  }
}
