const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const schema = require('../store/schema');

// healthcheck
router.get('/health', (req, res) => {
  res.status('200').send("Hello Rejendra Status: ok!");
});



router.get('/hi', (req, res) => {
  res.status('200').send("Hi all,Hope u are enjoying the music");
});

router.get('/today', (req, res) => {
  res.status('200').send("Today  is :"+new Date());
});



router.get('/hello', (req, res) => {
   res.status('200').send("Hello all,Hope u are enjoying the classical music");
});

router.get('/music', (req, res) => {
  res.status('200').send("Playing The Music");
});

router.get('/classical', (req, res) => {
  res.status('200').send("Playing The Classical Music");
});



// retrieve all musicians from data store
router.get('/all', (req, res) => {
  const { musician } = req.app.locals;
  musician.getMusicians(req.params.id, (err, returnedMusicians) => {
    if (err) {
      res.status('400').send({errorMessage: err});
    }
    res.status('200').send(returnedMusicians);
  });
});

// retrieve a musician from data store
router.get('/:id', (req, res) => {
  const { musician } = req.app.locals;
  musician.getMusician(req.params.id, (err, returnedMusician) => {
    if (err) {
      res.status('400').send({errorMessage: err});
    }
    res.status('200').send(returnedMusician);
  });
});

// modify existing musician or add a new one to the data store
router.put('/:id', jsonParser, async (req, res) => {
  try {
    const valid = await schema.isValid(req.body);
    if(valid) {
      const { musician } = req.app.locals;
      musician.putMusician(req.params.id, req.body, (err, id) => {
        if (err) {
          res.status('400').send({errorMessage: err});
        }
        res.status('200').send({id: id});
      });
    } else {
      res.status('400').send({errorMessage: 'Invalid request body'});
    }
  } catch(err) {
    res.status('400').send({errorMessage: 'Invalid request body'});
  }
});

// retrieve a musician from data store
router.delete('/:id', (req, res) => {
  const { musician } = req.app.locals;
  musician.deleteMusician(req.params.id, (err, deletedMusicianId) => {
    if (err) {
      res.status('400').send({errorMessage: err});
    }
    res.status('200').send(deletedMusicianId);
  });
});

module.exports = router;
