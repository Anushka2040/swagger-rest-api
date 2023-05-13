export interface BasicPet {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  photoUrls: [string];
  tags: {
    id: number;
    name: string;
  };
  status: string;
}
