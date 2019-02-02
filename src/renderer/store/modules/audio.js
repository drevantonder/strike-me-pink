import fs from 'fs'
import path from 'path'

const state = {
  audio: []
}

const mutations = {
  add (state, audio) {
    state.audio.push(audio)
  }
}

const actions = {
  add (context, { name, file }) {
    const fileName = name.replace(/\s+/g, '-').toLowerCase() + file.ext
    const newPath = path.join(__static, fileName)

    fs.copyFile(path.join(file.dir, file.base), newPath, (err) => {
      if (err) throw err
      context.commit('add', {
        name,
        file: fileName
      })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
