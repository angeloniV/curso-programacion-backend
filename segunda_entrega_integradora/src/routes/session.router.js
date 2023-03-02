import { Router } from "express";
import passport from "passport";
import { JWT_COOKIE_NAME } from "../config/credentials";

const router = Router();

//Vista para registrar usuarios
router.get('/register', (req, res) => {
    res.render('sessions/register');
})

// API para registrar
router.post('/register', passport.authenticate('register', { failureRedirect: '/session/failregister' }), async (req, res) => {
    res.redirect('/session/login')
});;

router.get('/failregister', (req, res) => {
    return res.status(401).render('errors/base', {
        error: 'Fail Strategy'
    });
});

// Vista de Login
router.get('/login', (req, res) => {
    res.render('sessions/login');
});

// API para login
router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: "error", error: "Invalid credentiales" })
    }
    // Se comenta al utilizar jwt
    // req.session.user = {
    //     first_name: req.user.first_name,
    //     last_name: req.user.last_name,
    //     email: req.user.email,
    //     age: req.user.age,
    // }

    res.cookie(JWT_COOKIE_NAME, req.user.token);
    res.redirect('/products/list')
});

// Cerrar Session
router.get('/logout', (req, res) => {
    // Se comenta al utilizar jwt
    // req.session.destroy(err => {
    //     if(err) {
    //         console.log(err);
    //         res.status(500).render('errors/base', {error: err});
    //     } else {
    //         res.redirect('/session/login');
    //     }
    // });
    res.clearCookie(JWT_COOKIE_NAME);
    res.redirect('/session/login');
});

router.get('/faillogin', (req, res) => {
    return res.status(401).render('errors/base', {
        error: 'Fail Login'
    });
});

// Seria la ruta 'current' pedida en la consigna.
router.get('/profile', (req, res) => {
    // Se comenta al utilizar jwt
    // res.json(req.session.user);

    res.json(req.user.user);

});

// Github
router.get('/github', passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {});

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}), async(req, res) => {
    req.session.user = req.user;
    res.redirect('/products/list');
});

export default router;
