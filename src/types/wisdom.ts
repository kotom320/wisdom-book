export type WisdomCategory =
  | "christian"
  | "buddhist"
  | "confucian"
  | "taoist"
  | "philosophy";

export type WisdomSource = {
  category: WisdomCategory;
  book: string;
  chapter?: string;
};

export type Wisdom = {
  id: string;
  source: WisdomSource;
  original: string;
  modern: string;
  interpretation: string;
  tags: string[];
  emotions: string[];
  situations: string[];
};
