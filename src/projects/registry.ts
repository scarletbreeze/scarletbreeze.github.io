import type { ProjectView } from './types'
import HeroLab from './hero-lab'
import VocStudio from './voc-studio'
import BrokerAtlas from './broker-atlas'
import TimeMachine from './time-machine'
import BrokerTycoon from './broker-tycoon'

// slug(data/projects.json) → 프로젝트 화면. 새 프로젝트는 여기에만 등록한다.
export const projectComponents: Record<string, ProjectView> = {
  'hero-lab': HeroLab,
  'voc-studio': VocStudio,
  'broker-atlas': BrokerAtlas,
  'time-machine': TimeMachine,
  'broker-tycoon': BrokerTycoon,
}
