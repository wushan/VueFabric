import Api from './Api'
export default {
  translate: function (location, callback) {
    console.log(location)
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20%3D%20' + location + '&format=json'
    console.log(url)
    Api.translateWeather(url, (err, data) => {
      this.loading = false
      if (err) {
        this.error = err.toString()
        callback && callback(err, null)
      } else {
        var conditionText = conditionTextDic[data.query.results.channel.item.condition.code.toString()]
        var conditionImg = conditionImgDic[data.query.results.channel.item.condition.code.toString()]
        var temp = Math.round((data.query.results.channel.item.condition.temp - 32) * 5 / 9) + '°C'
        var city = data.query.results.channel.location.city
        var country = data.query.results.channel.location.country
        callback && callback(null, {conditionText, conditionImg, temp, city, country})
      }
    })
    // $.ajax({
    //   url: url,
    //   dataType: 'json',
    //   success: function(json) {
    //     if (json.error) {
    //       return alert(json.error.description)
    //     } else {
    //       var conditionText = conditionTextDic[json.query.results.channel.item.condition.code.toString()]
    //       var conditionImg = conditionImgDic[json.query.results.channel.item.condition.code.toString()]
    //       var temp = Math.round((json.query.results.channel.item.condition.temp - 32)*5/9) + '°C'
    //       var city = json.query.results.channel.location.city
    //       console.log(city)
    //       $('#loading').fadeOut()
    //       var country = json.query.results.channel.location.country
    //         callback && callback({conditionText, conditionImg, temp, city, country})
    //     }
    //   },
    //   error: function(err){
    //     return alert(json.error.description)
    //   }
    // })

    var conditionImgDic = {
      '0': '00.svg',
      '1': '01.svg',
      '2': '02.svg',
      '3': '03.svg',
      '4': '04.svg',
      '5': '05.svg',
      '6': '06.svg',
      '7': '07.svg',
      '8': '08.svg',
      '9': '09.svg',
      '10': '10.svg',
      '11': '11.svg',
      '12': '12.svg',
      '13': '13.svg',
      '14': '14.svg',
      '15': '15.svg',
      '16': '16.svg',
      '17': '17.svg',
      '18': '18.svg',
      '19': '19.svg',
      '20': '20.svg',
      '21': '21.svg',
      '22': '22.svg',
      '23': '23.svg',
      '24': '24.svg',
      '25': '25.svg',
      '26': '26.svg',
      '27': '27.svg',
      '28': '28.svg',
      '29': '29.svg',
      '30': '30.svg',
      '31': '31.svg',
      '32': '32.svg',
      '33': '33.svg',
      '34': '34.svg',
      '35': '35.svg',
      '36': '36.svg',
      '37': '37.svg',
      '38': '38.svg',
      '39': '39.svg',
      '40': '40.svg',
      '41': '41.svg',
      '42': '42.svg',
      '43': '43.svg',
      '44': '44.svg',
      '45': '45.svg',
      '46': '46.svg',
      '47': '47.svg',
      '3200': 'na.svg'
    }
    var conditionTextDic = {
      '0': '龍捲風',
      '1': '熱帶風暴',
      '2': '颶風',
      '3': '強雷陣雨',
      '4': '雷陣雨',
      '5': '混合雨雪',
      '6': '混合雨雪',
      '7': '混合雨雪',
      '8': '冰凍小雨',
      '9': '細雨',
      '10': '凍雨',
      '11': '陣雨',
      '12': '陣雨',
      '13': '飄雪',
      '14': '陣雪',
      '15': '吹雪',
      '16': '下雪',
      '17': '冰雹',
      '18': '雨雪',
      '19': '多塵',
      '20': '多霧',
      '21': '陰霾',
      '22': '多煙',
      '23': '狂風大作',
      '24': '有風',
      '25': '冷',
      '26': '多雲',
      '27': '晴間多雲',
      '28': '晴間多雲',
      '29': '晴間多雲',
      '30': '晴間多雲',
      '31': '清晰的（夜）',
      '32': '晴朗',
      '33': '晴朗',
      '34': '晴朗',
      '35': '雨和冰雹',
      '36': '炎熱',
      '37': '雷陣雨',
      '38': '零星雷陣雨',
      '39': '零星雷陣雨',
      '40': '零星雷陣雨',
      '41': '大雪',
      '42': '零星陣雪',
      '43': '大雪',
      '44': '多雲',
      '45': '雷陣雨',
      '46': '陣雪',
      '47': '雷陣雨',
      '3200': '資料錯誤'
    }
  }
}
