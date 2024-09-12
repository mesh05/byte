type ProblemProp = {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  test_case: string;
  output: string;
};

type ContestProblemProp = ProblemProp & {
  contest_problem_id: number;
};

type ContestProp = {
  id: string;
  name: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  start_time: Date;
  end_time: Date;
  creator_user_id: string;
};
