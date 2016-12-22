import request from 'superagent'
export default {
  getLibCategory (cateId, subId, num, limit, isPublic, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/get_editor_library')
    .type('form')
    .send({cateId: cateId})
    .send({subId: subId})
    .send({num: num})
    .send({limit: limit})
    .send({public: isPublic})
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  getLibClock (cb) {
    request('http://radi.4webdemo.com/index.php/framesapi/get_clock')
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  getWeather (cateId, isPublic, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/get_weather')
    .type('form')
    .send({cateId: cateId})
    // .send({subId: subId})
    // .send({num: num})
    // .send({limit: limit})
    .send({public: isPublic})
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  translateWeather (url, cb) {
    request(url)
    .end(function (err, res) {
      if (err) {
        cb(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  getClock (id, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/get_clock_object')
    .type('form')
    .send({ClockID: id})
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  getPresets (num, limit, width, height, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/get_frames')
    .type('form')
    .send({num})
    .send({limit})
    .send({width})
    .send({height})
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  },
  saveProgram (data, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/save')
    .type('form')
    .send({obj: data})
    .end(function (err, res) {
      if (err) {
        cb(err, null)
      } else {
        console.log(res)
        cb(null, res.body)
      }
    })
  },
  getProgramList (num, limit, cb) {
    request.post('http://radi.4webdemo.com/index.php/framesapi/get_editor_link')
    .type('form')
    .send({num})
    .send({limit})
    .end(function (err, res) {
      if (err) {
        cb(err, null)
      } else {
        cb(null, res.body)
      }
    })
  },
  getSource (cb) {
    request('/static/assets/source/data.json')
    .end(function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb(null, res.body)
      }
    })
  }
}
