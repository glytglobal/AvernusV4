import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  let user = db.data.users[m.sender]
  let time = user.lastmining + 10000 //tiempo de espera en min
if (new Date - user.lastmiming < 10000) return await conn.reply(m.chat, `*_❗️ ESPERA UNOS MINUTOS PARA USAR OTRO COMANDO_*`,  m)
  try {
  	
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime)) if ((q.msg || q).seconds > 11) return m.reply('╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\n*_EL VIDEO NO DEBE DURAR MAS DE 7 SEGUNDOS_*\n\n*_INTENTELO CON OTRO VIDEO QUE DURE MENOS DE 7 SEGUNDOS_*')
      let img = await q.download?.()
      if (!img) throw `⏤͟͟͞͞𝑬𝑵𝑽𝑰𝑬 𝑼𝑵𝑨 𝑰𝑴𝑨𝑮𝑬𝑵 / 𝑽𝑰𝑫𝑬𝑶 / 𝑮𝑰𝑭 / 𝑬𝑵𝑳𝑨𝑪𝑬 𝑭𝑶𝑹𝑴𝑨𝑻𝑶 .𝑱𝑷𝑮 𝑷𝑨𝑹𝑨 𝑹𝑬𝑨𝑳𝑰𝒁𝑨𝑹 𝑺𝑼 𝑺𝑻𝑰𝑪𝑲𝑬𝑹`
        let out
      try {
        stiker = await sticker(img, false, global.packname, global.author)
      } catch (e) {
        console.error(e)
      } finally {
      await conn.reply(m.chat, `*_ESTOY CREANDO TU STICKER..._*`, m)
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packname, global.author)
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
      else return m.reply('URL invalido')
    }
  } catch (e) {
    console.error(e)
    if (!stiker) stiker = e
  } finally {
     if (stiker) conn.sendFile(m.chat, stiker, 'sticker.webp', '',m, true, { contextInfo: { 'forwardingScore': 200, 'isForwarded': false, externalAdReply:{ showAdAttribution: false, title: wm, body: `𝐀𝐯𝐞𝐫𝐧𝐮𝐬𝐁𝐨𝐭-𝐌𝐃 : 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭`, mediaType: 2, sourceUrl: accountsav, thumbnail: imagen1}}}, { quoted: m })
    else throw '⏤͟͟͞͞𝑬𝑵𝑽𝑰𝑬 𝑼𝑵𝑨 𝑰𝑴𝑨𝑮𝑬𝑵 / 𝑽𝑰𝑫𝑬𝑶 / 𝑮𝑰𝑭 / 𝑬𝑵𝑳𝑨𝑪𝑬 𝑭𝑶𝑹𝑴𝑨𝑻𝑶 .𝑱𝑷𝑮 𝑷𝑨𝑹𝑨 𝑹𝑬𝑨𝑳𝑰𝒁𝑨𝑹 𝑺𝑼 𝑺𝑻𝑰𝑪𝑲𝑬𝑹'
  }
user.lastmiming = new Date * 1
}
handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker'] 

export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " m y " + seconds + " s " 
}

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
