import ImageOptimizationInfo from "../components/ImageOptimizationInfo";
import OptimizedImageRenderer from "../components/OptimizedImageRenderer";

const CompressionComparison = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">
        Image Rendering Optimization Demo
      </h1>
      <div>
        <ImageOptimizationInfo></ImageOptimizationInfo>

        <h2 className="text-xl font-semibold mt-20 mb-6">Image</h2>
        <OptimizedImageRenderer
          srcBase="/images/sample"
          alt="Demo Image"
          width="50vw"
          height="50vw"
          lazy={true}
          placeholder="/images/sample-small.jpg"
          primaryColor="#f0f0f0"
        />
      </div>
    </div>
  );
};

export default CompressionComparison;
