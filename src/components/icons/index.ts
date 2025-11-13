// Icon barrel file - re-export only the icons we use
// This ensures tree-shaking works properly and keeps bundle size small
// Only these 3 icons will be included in the bundle, reducing size from ~1009kb to ~few kb
export { Heart as HeartIcon } from 'lucide-react';
export { AlertTriangle as TriangleAlertIcon } from 'lucide-react';
export { Cat as CatIcon } from 'lucide-react';
export { Check as CheckIcon } from 'lucide-react';
export { X } from 'lucide-react';
