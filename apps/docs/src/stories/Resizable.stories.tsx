import type { Meta, StoryObj } from "@storybook/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@webscit/registry";
import {
  ResizablePanelGroup as ShadcnResizablePanelGroup,
  ResizablePanel as ShadcnResizablePanel,
  ResizableHandle as ShadcnResizableHandle,
} from "@/components/ui/resizable";

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      style={{
        height: "200px",
        border: "1px solid var(--sct-color-border)",
        borderRadius: "var(--sct-radius-lg)",
      }}
    >
      <ResizablePanel defaultSize={50}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Panel One
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Panel Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnResizablePanelGroup
          orientation="horizontal"
          style={{
            height: "200px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <ShadcnResizablePanel defaultSize={50}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Panel One
            </div>
          </ShadcnResizablePanel>
          <ShadcnResizableHandle />
          <ShadcnResizablePanel defaultSize={50}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Panel Two
            </div>
          </ShadcnResizablePanel>
        </ShadcnResizablePanelGroup>
      ),
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      style={{
        height: "300px",
        border: "1px solid var(--sct-color-border)",
        borderRadius: "var(--sct-radius-lg)",
      }}
    >
      <ResizablePanel defaultSize={30}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Top
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Bottom
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnResizablePanelGroup
          orientation="vertical"
          style={{
            height: "300px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <ShadcnResizablePanel defaultSize={30}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Top
            </div>
          </ShadcnResizablePanel>
          <ShadcnResizableHandle />
          <ShadcnResizablePanel defaultSize={70}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Bottom
            </div>
          </ShadcnResizablePanel>
        </ShadcnResizablePanelGroup>
      ),
    },
  },
};

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      style={{
        height: "200px",
        border: "1px solid var(--sct-color-border)",
        borderRadius: "var(--sct-radius-lg)",
      }}
    >
      <ResizablePanel defaultSize={25}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Main
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          Details
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  parameters: {
    shadcn: {
      render: () => (
        <ShadcnResizablePanelGroup
          orientation="horizontal"
          style={{
            height: "200px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <ShadcnResizablePanel defaultSize={25}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Sidebar
            </div>
          </ShadcnResizablePanel>
          <ShadcnResizableHandle />
          <ShadcnResizablePanel defaultSize={50}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Main
            </div>
          </ShadcnResizablePanel>
          <ShadcnResizableHandle />
          <ShadcnResizablePanel defaultSize={25}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Details
            </div>
          </ShadcnResizablePanel>
        </ShadcnResizablePanelGroup>
      ),
    },
  },
};
