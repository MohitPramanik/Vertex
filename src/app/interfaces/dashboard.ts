export interface IDashBoardCard {
  title: string;
  data: string;
  subTitle?: string;
}

export type CardDataSelection = "self" | "team";

export interface DashboardCardApiResponse {
  status: string;
  data: {
    self: [];
    organization: [];
  }
}

export interface Holiday {
  name: string;
  date: string;
  day: string;
}