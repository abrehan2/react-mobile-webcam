// Imports:
import { svgDrawer } from '../../constants/svg-drawer';

export default function MobileHeader() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-12 h-12 border-black rounded-full">
        {svgDrawer.uploadImage}
      </div>
      <div className="overflow-hidden">
        <h1 className="text-base font-semibold text-black">Upload your data</h1>
        <p className="text-sm font-normal text-regular_layer">
          Please upload your data in the respective sections.
        </p>
      </div>
    </div>
  );
}
