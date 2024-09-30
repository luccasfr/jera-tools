'use server'

const s4 = () =>
  Math.floor((1 + Math.random()) * 0x1_00_00)
    .toString(16)
    .slice(1)

const guid = () => {
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`
}

export default async function generateGuid() {
  return guid()
}
