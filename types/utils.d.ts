type ProblemProp = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
};

type ContestProp = {
  id: string;
  name: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  startTime: Date;
  endTime: Date;
  creatorId: number;
};
