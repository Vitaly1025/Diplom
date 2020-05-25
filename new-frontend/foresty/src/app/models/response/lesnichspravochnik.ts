export class LeshosSpravochnik {
   public leshosName: string;
   public lesnichSpravochniks: LesnichSpravochnik[];
  }
  
export class LesnichSpravochnik {
   public id: number;
   public leshosId: number;
   public lesnichName?: string;
  }