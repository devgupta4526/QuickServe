import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import SessionModel from "../models/session.model";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
  resetPassword,
  sendPasswordResetEmail,
  verifyEmail,
} from "../services/auth.service";
import appAssert from "../utils/appAssert";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  getRefreshTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";
import catchErrors from "../utils/catchErrors";
import {
  emailSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verificationCodeSchema,
} from "../schema/auth.schemas";
import uploadToCloudinary from "../utils/cloudinaryUploader";
import ApiResponse from "../utils/ApiResponse"; // <-- import ApiResponse class

export const registerHandler = catchErrors(async (req, res) => {
  // Extract files
  const files = req.files as {
    avatar?: Express.Multer.File[];
    coverImage?: Express.Multer.File[];
  };

  const avatarUrl = files?.avatar
    ? await uploadToCloudinary(files.avatar[0].path, "avatars")
    : undefined;

  const coverImageUrl = files?.coverImage
    ? await uploadToCloudinary(files.coverImage[0].path, "covers")
    : undefined;

  if (avatarUrl) req.body.avatar = avatarUrl;
  if (coverImageUrl) req.body.coverImage = coverImageUrl;

  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(new ApiResponse(CREATED, user, "User registered successfully"));
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await loginUser(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(OK)
    .json(new ApiResponse(OK, user, "Login successful"));
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  const { payload } = verifyToken(accessToken || "");

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res)
    .status(OK)
    .json(new ApiResponse(OK, null, "Logout successful"));
});

export const refreshHandler = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

  const { accessToken, newRefreshToken } = await refreshUserAccessToken(refreshToken);

  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json(new ApiResponse(OK, { accessToken }, "Access token refreshed"));
});

export const verifyEmailHandler = catchErrors(async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res
    .status(OK)
    .json(new ApiResponse(OK, null, "Email was successfully verified"));
});

export const sendPasswordResetHandler = catchErrors(async (req, res) => {
  const email = emailSchema.parse(req.body.email);

  await sendPasswordResetEmail(email);

  return res
    .status(OK)
    .json(new ApiResponse(OK, null, "Password reset email sent"));
});

export const resetPasswordHandler = catchErrors(async (req, res) => {
  const request = resetPasswordSchema.parse(req.body);

  await resetPassword(request);

  return clearAuthCookies(res)
    .status(OK)
    .json(new ApiResponse(OK, null, "Password was reset successfully"));
});
