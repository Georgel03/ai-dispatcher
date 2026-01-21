import Image from 'next/image';

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  label: string;
  labelDesc: string;
}

const FeatureItem = ({ image, title, description, label, labelDesc }: FeatureProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
    <div className="lg:col-span-8">
      <div className="bg-slate-100 rounded-sm overflow-hidden mb-8 h-[350px] relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-900 mb-4">{title}</h2>
      <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">{description}</p>
    </div>
    <div className="lg:col-span-4 pt-4">
      <h3 className="text-amber-400 font-bold text-[10px] tracking-widest uppercase mb-4">{label}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{labelDesc}</p>
    </div>
  </div>
);

export default function FeatureList() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        <FeatureItem 
          image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
          title="Visualize Real-Time Insights and Maximize Fleet Management Efficiency"
          description="Harness the Power of Live Map Views and an Extensive Feature Set in PrecisionTrack, Providing Real-Time Insights and Visualizations to Drive Operational Excellence and Transform Your Fleet Management Strategies."
          label="LIVE MAP VIEWS"
          labelDesc="Experience the Comprehensive Suite of Advanced Features and Tools in PrecisionTrack, Empowering You to Optimize Fleet Management, Maximize Efficiency, and Stay Ahead of the Competition."
        />
        
        <FeatureItem 
          image="https://images.unsplash.com/photo-1473445730015-841f29a9490b?q=80&w=2070&auto=format&fit=crop"
          title="Integration with Satellites and GPS Technologies"
          description="By leveraging satellite communication, you can maintain uninterrupted tracking and communication capabilities regardless of location."
          label="INTEGRATION CAPABILITIES"
          labelDesc="Experience the Comprehensive Suite of Advanced Features and Tools in PrecisionTrack, Empowering You to Optimize Fleet Management."
        />

        <FeatureItem 
          image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
          title="Tailor Your Fleet Management Experience"
          description="Empower Data-Driven Decision Making and Gain Actionable Insights with PrecisionTrack's Customizable Dashboard Feature."
          label="CUSTOMIZABLE DASHBOARDS"
          labelDesc="Discover the Robust Feature Set of PrecisionTrack for Streamlined Fleet Management and Operational Excellence."
        />
      </div>
    </section>
  );
}