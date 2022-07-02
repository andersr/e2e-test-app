import type { NextApiRequest, NextApiResponse } from "next";
import emailValidator from "email-validator";

export type ServerResponse = {
  message: string;
  success: boolean;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServerResponse>
) {
  const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required", success: false });
      return;
    }

  if (!emailValidator.validate(email)) {
    res
      .status(400)
      .json({ message: "Not a validly formed email address", success: false });
    return;
  }

  res.status(200).json({
    message: `"${email}" was added to the mailing list. Thanks for signing up!`,
    success: true,
  });
}
