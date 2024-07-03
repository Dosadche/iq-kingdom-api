import authService from "./auth.service.js";

class AuthController {
    async register(req, res) {
        try {
            const registeredUser = await authService.register(req.body);
            res.status(201).json(registeredUser);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async login(req, res) {
        try {
            const loggedUser = await authService.login(req.body);
            res.status(200).json(loggedUser);
        } catch (error) {
            res.status(error.status).json(error);
        }
    }

    async refreshToken(req, res) {
        try {
            const newTokens = await authService.refreshTokens(req.body.refreshToken);
            res.status(200).json(newTokens);
        } catch (error) {
            res.json(error);
        }
    }

    async logout(req, res) {}
}

export default new AuthController();