import CryptoJS from 'crypto-js'

export const ellipsisMiddle = (
  text: string,
  maxLength: number,
  mimLength?: number
): string => {
  if (text?.length > maxLength + 6) {
    return (
      text?.slice(0, maxLength) +
      '...' +
      text?.slice(text?.length - (mimLength || maxLength))
    )
  } else {
    return text
  }
}

export const getUrlParams = (url: string) => {
  // 通过 ? 分割获取后面的参数字符串
  let urlStr = url && url.split('?')[1]
  // 创建空对象存储参数
  let obj: any = {}
  // 再通过 & 将每一个参数单独分割出来
  let paramsArr = urlStr.split('&')
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    // 再通过 = 将每一个参数分割为 key:value 的形式
    let arr = paramsArr[i].split('=')
    obj[arr[0]] = arr[1]
  }
  return obj
}
export const semicolon = (number: number | string) => {
  return new Intl.NumberFormat().format(Number(number))
}

export function getOS() {
  const userAgent = navigator.userAgent
  const isWin =
    navigator.platform === 'Win32' || navigator.platform === 'Windows'
  const isMac =
    navigator.platform === 'Mac68K' ||
    navigator.platform === 'MacPPC' ||
    navigator.platform === 'Macintosh' ||
    navigator.platform === 'MacIntel'
  if (isMac) return 'Mac'
  const isIphone =
    userAgent.indexOf('iPhone NT 10') > -1 ||
    userAgent.indexOf('iPhone OS') > -1
  if (isIphone) return 'iPhone'
  const isUnix = navigator.platform === 'X11' && !isWin && !isMac
  if (isUnix) return 'Unix'
  const isLinux = String(navigator.platform).indexOf('Linux') > -1
  if (isLinux) return 'Linux'
  if (isWin) {
    const isWin2K =
      userAgent.indexOf('Windows NT 5.0') > -1 ||
      userAgent.indexOf('Windows 2000') > -1
    if (isWin2K) return 'Win2000'
    const isWinXP =
      userAgent.indexOf('Windows NT 5.1') > -1 ||
      userAgent.indexOf('Windows XP') > -1
    if (isWinXP) return 'WinXP'
    const isWin2003 =
      userAgent.indexOf('Windows NT 5.2') > -1 ||
      userAgent.indexOf('Windows 2003') > -1
    if (isWin2003) return 'Win2003'
    const isWinVista =
      userAgent.indexOf('Windows NT 6.0') > -1 ||
      userAgent.indexOf('Windows Vista') > -1
    if (isWinVista) return 'WinVista'
    const isWin7 =
      userAgent.indexOf('Windows NT 6.1') > -1 ||
      userAgent.indexOf('Windows 7') > -1
    if (isWin7) return 'Win7'
    const isWin10 =
      userAgent.indexOf('Windows NT 10') > -1 ||
      userAgent.indexOf('Windows 10') > -1
    if (isWin10) return 'Win10'
    const isWin11 =
      userAgent.indexOf('Windows NT 11') > -1 ||
      userAgent.indexOf('Windows 11') > -1
    if (isWin11) return 'Win11'
  }
}

export function deviceType() {
  const ua = navigator.userAgent
  const isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1 //android终端
  const isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  } else {
    return 'pc'
  }
}

export function getOSVersion() {
  const userAgent = navigator.userAgent
  return userAgent.split('(')[1].split(')')[0]
}

export function getScreen() {
  return window.screen.width + '*' + window.screen.height
}
export function getLanguage() {
  return navigator.language
}

export function getCookieKey(uid: string) {
  const t = new Date().getTime()
  // 获取缓存
  const catchStr: any = localStorage.getItem('Pi_V2')
  const catchObj = JSON.parse(catchStr)
  const decodedString = window.btoa(uid)

  // 30天缓存时间
  const time = 30 * 24 * 60 * 60 * 1000
  const secretkey = t + time

  let catchKey = ''

  // 设置缓存
  const setCatch = () => {
    const obj = {
      v: decodedString,
      s: false,
      t: t,
      r: 'PI',
    }
    // console.log(obj);
    // 使用 AES 加密数据
    // const encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), '666').toString();
    const iv = 'c5defg0045222cH2'
    const encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(obj),
      secretkey.toString() + '000',
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString()
    // const encrypted1 = CryptoJS.AES.encrypt(JSON.stringify(obj), secretkey.toString());
    const encrypted_v1 = encrypted + '!?pt=' + t
    localStorage.setItem('Pi_V2', JSON.stringify(encrypted_v1))
    catchKey = encrypted_v1
  }

  // 判断缓存是否存在
  if (catchObj) {
    // 判断缓存是否过期
    if (new Date().getTime() - catchObj?.t > time) {
      localStorage.removeItem('Pi_V2')
      setCatch()
    } else {
      catchKey = catchObj
    }
  } else {
    //不存在，生成
    setCatch()
  }
  // console.log(catchKey,'catchKey');
  return catchKey
}

export function getBrowserFingerprint(res: { getCatchKey: any }) {
  let fingerprint
  function bin2hex(s: string) {
    let i,
      l,
      n,
      o = ''
    s += ''

    for (i = 0, l = s.length; i < l; i++) {
      n = s.charCodeAt(i).toString(16)
      o += n.length < 2 ? '0' + n : n
    }

    return o
  }

  const canvas = document.createElement('canvas')
  const ctx: any = canvas.getContext('2d')
  const txt = res || window.location.host
  ctx.textBaseline = 'top'
  ctx.font = "14px 'Arial'"
  ctx.textBaseline = 'tencent'
  ctx.fillStyle = '#000'
  ctx.fillRect(125, 1, 62, 20)
  if (Object.keys(res).length === 0) {
    ctx.fillText(txt, 2, 15)
    ctx.fillText(txt, 4, 17)
  } else {
    ctx.fillText(res.getCatchKey, 2, 15)
    ctx.fillText(deviceType(), 4, 17)
    ctx.fillText(getOS(), 6, 19)
    ctx.fillText(getOSVersion(), 8, 21)
    ctx.fillText(getScreen(), 10, 23)
    ctx.fillText(getLanguage(), 12, 25)
  }

  const b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
  // console.log(b64);
  const bin = atob(b64)
  const crc = bin2hex(bin.slice(-16, -12))
  // eslint-disable-next-line prefer-const
  fingerprint = crc
  return fingerprint
}
