const animationSoftware = [
  '3D Movie Maker',
  'Akeytsu',
  'Aladdin4D',
  'Anim8or',
  'Autodesk 3ds Max',
  'Autodesk Maya',
  'Autodesk MotionBuilder',
  'Autodesk Softimage',
  'BlenderGPL v2',
  'Bryce',
  'Carrara',
  'Cheetah3D',
  'Cinema 4D',
  'Clara.io',
  'Daz Studio',
  'Houdini',
  'iClone',
  'LightWave 3D',
  'Messiah',
  'MikuMikuDance',
  'Modo',
  'Moviestorm',
  'Muvizu',
  'Oculus Quill',
  'Poser',
  'Shade 3D',
  'Source Filmmaker',
  'ZBrush'
]

const programmingLanguages = [
  'Python',
  'Ruby',
  'C++',
  'PHP',
  'Java',
  'Javascript',
  'TypeScript',
  'C#',
  'C',
  'Kotlin',
  'Go',
  'SQL'
]

export const skills = [...animationSoftware, ...programmingLanguages].map(skill => ({
  id: skill,
  name: skill
}))
