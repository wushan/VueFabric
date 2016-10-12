<template lang="pug">
  #attributes
    .panels
      .attributes-wrapper.panel
        .attributes-inner
          .attribution-group.basics
            p Basics
            .row
              .controlgroup.type
                label 類型
                .controls
                  input(type='text' readonly)
              .width.controlgroup
                label 寬度
                .controls
                  input.objectSize#objectWidth(type='number')
              .height.controlgroup
                label 高度
                .controls
                  input.objectSize#objectHeight(type='number')
              .radius.controlgroup
                label 半徑
                .controls
                  input#objectRadius(type='number' readonly)
              
              .position.controlgroup
                label Y 軸
                .controls
                  input#objectTop(type='number')
              .position.controlgroup
                label X 軸
                .controls
                  input#objectLeft(type='number')
              .angle.controlgroup
                label 角度
                .controls
                  input#objectAngle(type='text')
              .scalex.controlgroup
                label X 延展
                .controls
                  input#objectScaleX(type='text')
              .scaley.controlgroup
                label Y 延展
                .controls
                  input#objectScaleY(type='text')
              .color.controlgroup
                label 背景色
                .controls
                  input#objectColor(type='text')
          .attribution-group.fonts
            p Fonts Specific
            .controlgroup.text.text-attr
              label 文字
              .controls
                input#objectInput(type='text')
            .controlgroup.fontfamily
              label 字體
              .controls
                .select-wrapper
                  select#objectFontFamily
                    option(value="Open Sans") 預設 (Open Sans)
                    option(value="DFYa-W3-WIN-BF") 華康雅風體
                    option(value="DFHuaZong-W5-WIN-BF") 華綜體體
                    option(value="DFJinWen-W3-WIN-BF") 華康金文體
                    option(value="DFXingShu-W5-WIN-BF") 華康行書體
                    option(value="DFYingHeiU-W7-WIN-BF") 華康硬黑體
                    option(value="DFYanKai-W5-WIN-BF") 華康正顏楷體
                    option(value="DFOYangXun-W5-WIN-BF") 華康歐陽詢體
                    option(value="DFFangYuan-W7-WIN-BF") 華康方圓體
                    option(value="DFWaWa-W5-WIN-BF") 娃娃體
                    option(value="DFLiHei-W5-WIN-BF") 華康儷中黑體
                    option(value="Verdana") Verdana
                    option(value="Times") Times
                    option(value="Strasua") Strasua
                    option(value="SegoeScript") Segoe Script
                    option(value="OratorStd") Orator Std
                    option(value="MicrosoftJhengHeiLight") 微軟正黑 Light
                    option(value="MicrosoftJhengHeiBold") 微軟正黑 Bold
                    option(value="Serif") 細明體
                    option(value="CopperplateGothic-Light") Copperplate Gothic Light
                    option(value="ComicSansMS") Comic Sans MS
                    option(value="BerlinSansFBDemi-Bold") Berlin Sans FB Demi-Bold
                    option(value="Arial") Arial
                    option(value="ARBERKLEY") ARBERKLEY
                    option(value="FuturaBT-Book") FuturaBT Book
            .row
              .controlgroup.color
                label 顏色
                .controls
                  input#objectTextColor(type='text')
            
              .controlgroup.fontsize
                label 尺寸
                .controls
                  .select-wrapper
                    select#objectFontSize
                      option(value='14') 14
                      option(value='18') 18
                      option(value='24') 24
                      option(value='30') 30
                      option(value='36') 36
                      option(value='40') 40
                      option(value='44') 44
                      option(value='48') 48
                      option(value='56') 56
                      option(value='64') 64
                      option(value='72') 72
                      option(value='84') 84
                      option(value='96') 96
                      option(value='128') 128
                      option(value='144') 144
                      option(value='168') 168
                      option(value='192') 192
          .attribution-group.specials
            p Interactive
            .controlgroup
              label 互動類型
              .controls.rich-control
                .select-wrapper
                  select#interactives
                    option(value='none' selected) 無互動
                    option(value='apps') 啟動 APP
                    option(value='slide') 滑動
                    option(value='slidewitharrow') 滑動 (有箭頭)
                    option(value='previous') 上一節目
                    option(value='escape') 退出互動
                    option(value='interactive') 互動節目
            .controlgroup.link(style="display: none;")
              label 連結
              .controls.rich-control
                input#linkValue(type='text')
                a.js-inbounds(href="javascript:;")
                  i.fa.fa-link.fa-2x
            .application(style="display: none;")
              .controlgroup
                label 套件名稱
                .controls.rich-control
                  input#appName(type='text')
              .controlgroup
                label 退出方式
                .controls.rich-control
                  .select-wrapper
                    select#appEscape
                      option(value="Manual") 手動退出
                      option(value="Force") 強制關閉
              .controlgroup
                .controls.rich-control
                  .row
                    .grid.g-6-12
                      input#appEscapeTime(type='number', value="30")
                    .grid.g-6-12
                      label 秒強制關閉
              .controlgroup
                label 懸浮按鈕
                .controls.rich-control
                  .select-wrapper
                    select#appEscapeButton
                      option(value="ON") 啟用
                      option(value="OFF") 不啟用
              .controlgroup
                label 按鈕位置
                .controls.rich-control
                  .select-wrapper
                    select#appEscapeButtonPos
                      option(value="lefttop") 左上
                      option(value="leftcenter") 左中
                      option(value="leftbottom") 左下
                      option(value="righttop") 右上
                      option(value="rightcenter") 右中
                      option(value="rightbottom") 右下
                      option(value="centertop") 中上
                      option(value="centercenter") 中中
                      option(value="centerbottom") 中下
              .controlgroup
                label 按鈕尺寸
                .controls.rich-control
                  .select-wrapper
                    select#appEscapeButtonSize
                      option(value="L") 大
                      option(value="M") 中
                      option(value="S") 小
              .controlgroup
                button#appSave.btn.basic.full(type="button") 儲存 APP 設定
          .attribution-group.media
            p Medias
            .controlgroup.media
              label 素材
              .controls.rich-control
                a.js-library(href="javascript:;")
                  i.fa.fa-cloud-upload.fa-2x
                input#mediaValue(type='text' readonly)
              .mediaPreview
          .attribution-group.webview
            p Webview Url
            .controlgroup.webview
              label 網址
              .controls
                input#webviewUrl(type="text", placeholder="http://google.com")
            p Placeholder
            .controlgroup.webview
              label 替代圖
              .controls.rich-control
                a.js-library(href="javascript:;")
                  i.fa.fa-cloud-upload.fa-2x
                input#webviewPlaceholder(type='text' readonly)

          .attribution-group.clock
            p Clock Specific
            .controlgroup.clock
              label 時區
              .controls
                .select-wrapper
                  select#gmt-time
                    option(data-tz='Etc/GMT+12', value='-12') [-01:00] Etc/GMT+12
                    option(data-tz='Pacific/Midway', value='-11') [-11:00] Pacific/Midway
                    option(data-tz='Pacific/Honolulu', value='-10') [-10:00] Pacific/Honolulu
                    option(data-tz='Pacific/Gambier', value='-9') [-09:00] Pacific/Gambier
                    option(data-tz='Pacific/Pitcairn', value='-8') [-08:00] Pacific/Pitcairn
                    option(data-tz='America/Creston', value='-7') [-07:00] America/Creston
                    option(data-tz='America/Belize', value='-6') [-06:00] America/Belize
                    option(data-tz='America/Atikokan', value='-5') [-05:00] America/Atikokan
                    option(data-tz='America/Anguilla', value='-4') [-04:00] America/Anguilla
                    option(data-tz='America/Araguaina', value='-3') [-03:00] America/Araguaina
                    option(data-tz='America/Noronha', value='-2') [-02:00] America/Noronha
                    option(data-tz='America/Scoresbysund', value='-1') [-01:00] America/Scoresbysund
                    option(data-tz='Africa/Abidjan', value='0') [+00:00] Africa/Abidjan
                    option(data-tz='Africa/Algiers', value='1') [+01:00] Africa/Algiers
                    option(data-tz='Africa/Blantyre', value='2') [+02:00] Africa/Blantyre
                    option(data-tz='Africa/Asmara', value='3') [+03:00] Africa/Asmara
                    option(data-tz='Asia/Dubai', value='4') [+04:00] Asia/Dubai
                    option(data-tz='Antarctica/Mawson', value='5') [+05:00] Antarctica/Mawson
                    option(data-tz='Antarctica/Vostok', value='6') [+06:00] Antarctica/Vostok
                    option(data-tz='Asia/Bangkok', value='7') [+07:00] Asia/Bangkok
                    option(data-tz='Asia/Taipei', value='8') [+08:00] Asia/Taipei
                    option(data-tz='Asia/Seoul', value='9') [+09:00] Asia/Seoul
                    option(data-tz='Australia/Brisbane', value='10') [+10:00] Australia/Brisbane
                    option(data-tz='Asia/Magadan', value='11') [+11:00] Asia/Magadan
                    option(data-tz='Asia/Anadyr', value='12') [+12:00] Asia/Anadyr
                    option(data-tz='Pacific/Enderbury', value='13') [+13:00] Pacific/Enderbury
                    option(data-tz='Pacific/Kiritimati', value='14') [+14:00] Pacific/Kiritimati
          .attribution-group.sliders
            .row
              .grid.g-6-12
                p Sliders
              .grid.g-6-12.right
                a.btn.basic.js-library(href="javascript:;") 增加
            
            form#updateSlider
              ul#slidesOrder
              button.btn.edit.full(type="submit") 確定變更
          .attribution-group.rtsp
            p RTSP 資源
            .controlgroup.rtsp
              label 網址
              .controls
                input#rtspUrl(type="text", placeholder="rtsp://000.000.000.00")
</template>

<script>
export default {
  name: 'Attributes',
  components: {
  }
}
</script>

<style>
</style>
