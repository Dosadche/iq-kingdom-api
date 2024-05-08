import User from "../../models/user.schema.js";
import RefreshToken from "../../models/refresh-token-schema.js";
import bcrypt from "bcrypt";
import configs from "../../../configs.json" assert { type: "json" };
import jwt from "jsonwebtoken";

class AuthService {
    get unauthenticatedError() {
        return Object.assign(new Error, { message: 'Unauthenticated', status: 401 })
    }

    async register(user) {
        const hashedPassword = await bcrypt.hash(user.password, configs.security.salt ?? 10);
        const registeredUser = await User.create({
            ...user,
            password: hashedPassword,
        });
        return this.mapUser(registeredUser);
    }

    async login(user) {
        const userFromDb = await User.findOne({ email: user.email });
        if (!userFromDb) {
            throw Object.assign(new Error, { message: 'User not found', status: 404 });
        }
        if (await bcrypt.compare(user.password, userFromDb.password)) {
            const mappedUser = this.mapUser(userFromDb)
            const tokens = await this.getJWTTokens(mappedUser);
            return { ...mappedUser, ...tokens };
        } else {
            throw Object.assign(new Error, { message: 'Wrong password or email', status: 403 });
        }
    }

    async refreshTokens(refreshToken) {
        const tokenFromDb = await RefreshToken.findOne({ refreshToken });
        if (!tokenFromDb) {
            throw this.unauthenticatedError;
        }
        let userFromToken;
        jwt.verify(refreshToken, configs.security.refreshTokenSecret, (error, user) => {
            if (error) {
                throw this.unauthenticatedError;
            } else {
                userFromToken = { id: user.id, timeStamp: new Date().getTime() };
            }
        });
        this.deleteOldRefreshToken(tokenFromDb.id);
        if (userFromToken) {
            const refreshedTokens = await this.getJWTTokens(userFromToken);
            return refreshedTokens;
        } else {
            throw this.unauthenticatedError;
        }
    }

    async getJWTTokens(user) {
        const accessToken = jwt.sign(user, configs.security.accessTokenSecret, { expiresIn: '60s' });
        const refreshToken = await this.getAndStoreRefreshToken(user);
        return {
            accessToken,
            refreshToken,
        };
    }

    async getAndStoreRefreshToken(user) {
        const refreshToken = jwt.sign(user, configs.security.refreshTokenSecret);
        await RefreshToken.create({ refreshToken, userId: user.id });
        return refreshToken;
    }

    async deleteOldRefreshToken(id) {
        await RefreshToken.findByIdAndDelete(id);
    }

    mapUser(user) {
        const mappedUser = user.toObject({ virtuals: true });
        delete mappedUser['password'];
        return mappedUser;
    }
}

export default new AuthService();