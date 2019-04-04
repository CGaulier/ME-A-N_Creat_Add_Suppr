/*
Importer les composants de la route
*/
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectID;
//

/**
 * 
 * Configuration de Mongoose
 */

    const mongoose = require('mongoose');
    const mongoServeur = 'mongodb://localhost:27017/blog';
//


/*
Configuration de body-parser
*/
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));
//

/*
Définition des routes
*/
// Accueil de l'API
router.get( '/', (req, res) => {
    // Renvoyer un flux JSON dans la réponse
    res.json( { content: 'Hello API' } );
});

// Afficher la liste des t$âches
router.get( '/posts', (req, res) => {
   
    //Connextion à la base de données mongoDB
    mongoose.connect(mongoServeur, (err, db)=>{
        //Tester ma connexion
        if(err){ res.json({error: err}) }
        else{
            //Connexion ouverte : récupérer la collection de données
            db.collection('posts').find().toArray( (err, collection)=>{

                //tester la connexion de la collection
                if(err){res.json({error:err})}
                else{
                    //Collection récupérée
                    res.json(collection);
                }
            } )
        };

        //Fermer la connexion
        db.close();

    })

});

    //Créer une route API pour ajouter un article
    router.post('/add-posts', (req,res)=>{
        console.log(req.body);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('add-posts', {msg:err}) }
            else{
                //Connexion ouverte : ajouter les données dans la BDD
                db.collection('posts').insert({ 
                    title: req.body.title, 
                   type:req.body.type}, (err, newObject)=>{
                    //Verifier l'ajout
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301, '/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })





//

    //Créer une route API pour supprimer un article
    router.post('/suppr-posts/:id', (req,res)=>{
        console.log(req.params.id);
        mongoose.connect(mongoServeur, (err, db)=>{
            //Tester ma connexion
            if(err){ res.render('suppr-posts', {msg:err}) }
            else{
                //Connexion ouverte : supprimer les données dans la BDD
                db.collection('posts').remove({ 
                    _id: new ObjectId(req.params.id)
                   }, (err, newObject)=>{
                    //Verifier LA SUPPRESSION
                    if(err){res.redirect(500,'/') }
                    else{
                        res.redirect(301,'/')
                    }
                })
            };
    
            //Fermer la connexion
            db.close();
    
        })
    })





//

router.post('/update-posts/:id', (req,res)=>{
    console.log(req.body);
    mongoose.connect(mongoServeur, (err, db)=>{
        //Tester ma connexion
        if(err){ res.render('update-posts', {msg:err}) }
        else{
            //Connexion ouverte : ajouter les données dans la BDD
            db.collection('posts').updateOne({ 
                _id: new ObjectId(req.params.id)},
                { $set: { 
                        title: req.body.title,
                        type: req.body.type
                     }
                }, (err, newObject)=>{
                //Verifier l'ajout
                if(err){res.redirect(500,'/') }
                else{
                    res.redirect(301,'/')
                }
            })
        };
        //Fermer la connexion
        db.close();

    })
})




//




/*
Exporter le module de route
*/
module.exports = router;
//