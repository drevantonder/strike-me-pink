
function modifier (prefix, modifiers) {
  if (Array.isArray(modifiers[0])) modifiers = modifiers[0]

  let modifierProps = {}

  modifiers.forEach(color => {
    modifierProps[color] = {
      required: false,
      default: false,
      type: Boolean
    }
  })

  return {
    props: {
      ...modifierProps
    },

    computed: {
      modifiersClass () {
        return Object.keys(this.$props)
          .filter(key => modifiers.includes(key) && this[key] === true)
          .map(modifier => prefix + modifier)
          .join(' ')
      }
    }
  }
}

export const isModifier = (...modifiers) => modifier('is-', modifiers)
export const hasModifier = (...modifiers) => modifier('has-', modifiers)
