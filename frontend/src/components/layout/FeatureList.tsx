import Image from 'next/image';

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  label: string;
  labelDesc: string;
}

const FeatureItem = ({ image, title, description, label, labelDesc }: FeatureProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <div className="lg:col-span-8">
      <div className="bg-slate-100 rounded-xl overflow-hidden mb-10 h-[400px] shadow-lg relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
        />
      </div>
      
      <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
        {title}
      </h2>
      
      <p className="text-slate-600 text-xl leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
    <div className="lg:col-span-4 pt-4 lg:pt-0 flex flex-col justify-center bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm h-full">
      
      <h3 className="text-blue-600 font-extrabold text-lg tracking-widest uppercase mb-4">
        {label}
      </h3>
      
      <p className="text-slate-700 text-lg leading-relaxed">
        {labelDesc}
      </p>
    </div>
  </div>
);

export default function FeatureList() {
  return (
    <section className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6 space-y-40">
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
          description="By leveraging satellite communication, you can maintain uninterrupted tracking and communication capabilities regardless of location. Never lose sight of your valuable assets."
          label="INTEGRATION CAPABILITIES"
          labelDesc="Experience the Comprehensive Suite of Advanced Features and Tools in PrecisionTrack, Empowering You to Optimize Fleet Management across borders and harsh terrains."
        />

        <FeatureItem 
          image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop"
          title="Tailor Your Fleet Management Experience"
          description="Empower Data-Driven Decision Making and Gain Actionable Insights with PrecisionTrack's Customizable Dashboard Feature. Build the views that matter most to your dispatchers and executives."
          label="CUSTOMIZABLE DASHBOARDS"
          labelDesc="Discover the Robust Feature Set of PrecisionTrack for Streamlined Fleet Management and Operational Excellence at scale."
        />
      </div>
    </section>
  );
}