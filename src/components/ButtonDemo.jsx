import React from "react";
import { Button } from "@/components/ui/button";

const ButtonDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">shadcn/ui Button Demo</h1>
      
      {/* Default Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Default Variant</h2>
        <div className="flex flex-wrap gap-4">
          <Button size="sm">Small Button</Button>
          <Button size="default">Default Button</Button>
          <Button size="lg">Large Button</Button>
          <Button size="icon">🚀</Button>
        </div>
      </div>

      {/* Variant Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled State</h2>
        <div className="flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      </div>

      {/* Custom Styled */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Styled</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Gradient Button
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            Success Button
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
