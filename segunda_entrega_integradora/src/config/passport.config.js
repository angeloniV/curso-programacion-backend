import passport from "passport";
import local from "passport-local"
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword, generateToken, extractCookie } from '../utils.js';
import GitHubStrategy from 'passport-github2';
import userModel from "../dao/models/user.model.js";
import passport_jwt from 'passport-jwt'
import { JWT_PRIVATE_KEY } from './credentials.js'

const LocalStrategy = local.Strategy;
const JWTStrategy = passport_jwt.Strategy;
const ExtractJWT = passport_jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {

        const {first_name, last_name, email, age } = req.body
        try {
            const user = await UserModel.findOne({email: username})
            if(user) {
                console.log("User already exits");
                return done(null, false);
            }

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };
            const result = await UserModel.create(newUser);

            return done(null, result);
        } catch (error) {
            return done("[LOCAL] Error al obtener user " + error);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done) => {
        try {
            const user = await UserModel.findOne({email: username})
            if(!user) {
                console.log("User dont exist");
                return done(null, user);
            }

            if(!isValidPassword(user, password)) return done(null, false);

            const token = generateToken(user);
            user.token = token;

            return done(null, user);
        } catch (error) {

        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: 'Iv1.16439418345c1eb3',
        clientSecret: '6029157b6737e790cd56cd67a0da8d140a861c2a',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (acessToken, refreshToke,profile,done) => {
        try{
            let user = await userModel.findOne({email: profile._json.email});
            if (!user) {
                let newuser = {
                    first_name: profile._json.name,
                    last_name: '',
                    age: 18,
                    email: profile._json.email,
                    password: ''
                }
                let result = await userModel.create(newuser);
                done(null, result);
            } else {
                done (null, user);
            }
        }catch(error){
            return done(error);
        }
    }));

    // Seria la estrategia 'current' pedida en la consigna.
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([extractCookie]),
        secretOrKey: JWT_PRIVATE_KEY
    }, async(jwt_payload, done) => {
        done(null, jwt_payload)
    }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id);
        done(null, user);;
    })

}

export default initializePassport;
