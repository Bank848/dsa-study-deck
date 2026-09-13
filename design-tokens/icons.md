# Icon Map — Lucide

ใช้ [lucide-react](https://lucide.dev) ทั้งเว็บ (`npm install lucide-react`) — เส้น stroke เท่ากันทุกตัว, resize คมชัด, ฟรี ไม่ต้องพึ่ง AI generation

## Controls (visualizer)
| ใช้ที่ | icon name |
|---|---|
| prev step | `ChevronLeft` |
| play | `Play` |
| pause | `Pause` |
| next step | `ChevronRight` |
| reset | `RotateCcw` |

## Section headers
| ใช้ที่ | icon name |
|---|---|
| Concept card | `Lightbulb` |
| Complexity table | `ListOrdered` |
| Visualizer | `GitBranch` |
| Quiz | `HelpCircle` |
| checkmark (แก้ถูก / บทที่ทำแล้ว) | `Check` |
| warning (จุดอ่อน / worst case) | `AlertTriangle` |

## Chapter icons (sidebar rail)
| บท | icon name |
|---|---|
| 01 Intro & Big-O | `Compass` |
| 02 Stacks & Queues | `Layers` |
| 03 Trees & BST | `GitBranch` |
| 04 Search Trees | `Search` |
| 05 Heaps & Priority Queues | `TrendingUp` |
| 06 Hash Tables | `Hash` |
| 07 String Matching | `TextSearch` |
| 08 Dynamic Programming | `Grid3x3` |

## Usage pattern (React)
```tsx
import { Play, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

<button><Play size={14} /></button>
```

ทุก icon set สี stroke ผ่าน `currentColor` เสมอ — ไม่ hardcode สี ให้กิน token `--semantic-color-*` จาก `tokens.css` ผ่าน `color:` ของ parent element
