import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
const path = require('path')

const requireComponent = require.context(
  // folder to look in
  './',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match component filenames
  /[A-Z]\w+\.vue$/
)

requireComponent.keys().forEach(filePath => {
  // Get component config
  const componentConfig = requireComponent(filePath)
  const fileName = path.basename(filePath)

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Strip the leading `./` and extension from the filename
      fileName.replace(/(.*)\.\w+$/, '$1')
    )
  )

  // Register component globally
  Vue.component(
    'B' + componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})
