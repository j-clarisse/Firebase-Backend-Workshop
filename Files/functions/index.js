const functions = require('firebase-functions');
const admin = require("firebase-admin");
const express = require("express");
const app = express();
//const firebase = require("firebase");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*  exports.helloWorld = functions.https.onRequest((request, response) => {
   functions.logger.info("Hello logs!", {structuredData: true});
   response.send("Hello world!");
 }); */

 const db = admin.firestore();

 app.get("/getMovies", (request, response) => {
   db.collection("movies")
     .orderBy("title")
     .get()
     .then((data) => {
       let movies = new Array();
       data.forEach((doc) => {
         movies.push(doc.data());
       });
       return response.json({ movies });
     });
 });
 app.post("/createNewMovie", (request, response) => {
   const genres = String(request.body.genres).split(",");
   const newMovie = {
     title: request.body.title,
     yearReleased: parseInt(String(request.body.yearReleased)),
     imageURL: request.body.imageURL,
     genres: genres,
   };
   db.collection("movies")
     .add(newMovie)
     .then((data) => {
       return response.json({
         status: "success",
         details: `movie ID ${data.id} added`,
       });
     })
     .catch((err) =>
       response.status(500).json({ status: "failed", error: err.code })
     );
 });


 exports.api = functions.region("asia-east2").https.onRequest(app);


// ver let const -> declare variable
/* 
const db = admin.firestore();

app.get("/getMovies", (request, response) => {
    //if(request.method !== "POST") return response.status(500).json({error: "Method not allowed!"})
    db.collection("movies")
        .get()
        .then((data) => {
            let movies = []; //new Array();
            data.forEach((doc) => {
               movies.push(doc.data());
        });
        return response.json({ movies });
    })
    .catch((err) => response.status(500).json({ error: err.code }));
});

app.post("/createNewMovie", (request, response) => {
    const genres = String(request.body.genres).split(",");
    const newMovie = {
        title: request.body.title,
        yearReleased: parseInt(String(request.body.yearReleased)),
        imageURL: request.body.imageURL,
        genres: genres,
    };
    db.collection("movies")
        .add(newMovie)
        .then((data) => {
            return response.json({
                status: "Success", 
                details: `movie with ID ${data.id} added`,
            });
        })
        .catch((err) => response.status(500).json({ status: "failed", error: err.code }));
});

exports.api = functions.region("asia-east2").https.onRequest(app);
 */

/* exports.getMovies = functions.https.onRequest((request, response) => {
    //if(request.method !== "POST") return response.status(500).json({error: "Method not allowed!"})
    admin
        .firestore()
        .collection("movies")
        .get()
        .then((data) => {
            let movies = []; //new Array();
            data.forEach(doc => {
               movies.push(doc.data());
        });
        return response.json({ movies });
    })
    .catch((err) => response.status(500).json({ error: err.code }));
}); */