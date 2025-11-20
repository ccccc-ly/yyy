export interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | '品牌设计' | '艺术指导';
  imageUrl: string;
  year: string;
}

export enum SectionId {
  HERO = 'hero',
  PORTFOLIO = 'portfolio',
  CONTACT = 'contact',
}
