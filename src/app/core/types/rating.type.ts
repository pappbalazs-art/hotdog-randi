import { Timestamp } from '@angular/fire/firestore';

export type Rating = {
  locationName: string;
  locationAddress: string;
  date: Timestamp;
  dogRating: number;
  dogNotes: string;
  bunRating: number;
  bunNotes: string;
  sauceRating: number;
  sauceNotes: string;
  sauceToDogRatioRating: number;
  sauceToDogRatioNotes: string;
  dogToBunRatioRating: number;
  dogToBunRatioNotes: string;
  overallTasteRating: number;
  overallTasteNotes: string;
  customerServiceRating: number;
  customerServiceNotes: string;
  overallExperienceRating: number;
  overallExperienceNotes: string;
  score: number;
  createBy: {
    userUID: string;
    timestamp: Timestamp | null;
  };
};
