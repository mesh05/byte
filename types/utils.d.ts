type ProblemProp = {
  problem_id: number;
  problem_title: string;
  problem_description: string;
  problem_difficulty: string;
  problem_test_case: string;
  problem_output: string;
};

type ContestProblemProp = ProblemProp & {
  contest_problem_id: numbe;
};

type ContestProp = {
  contest_id: string;
  contest_name: string;
  status: "ongoing" | "completed" | "upcoming";
  start_time: Date;
  end_time: Date;
  creator_user_id: number;
};
