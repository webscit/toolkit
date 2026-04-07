import { render } from "vitest-browser-react";
import { describe, it, expect } from "vitest";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs", () => {
  it("renders without crashing", async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    await expect.element(screen.getByRole("tablist")).toBeInTheDocument();
  });

  it("shows the default selected tab content", async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    await expect.element(screen.getByText("Content A")).toBeInTheDocument();
  });

  it("active tab trigger has data-active attribute", async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
      </Tabs>,
    );
    await expect
      .element(screen.getByRole("tab", { name: "Tab A" }))
      .toHaveAttribute("data-active");
  });

  it("switches tab on click", async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>,
    );
    await screen.getByRole("tab", { name: "Tab B" }).click();
    await expect
      .element(screen.getByRole("tab", { name: "Tab B" }))
      .toHaveAttribute("data-active");
  });

  it("forwards className on trigger", async () => {
    const screen = await render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a" className="my-class">
            Tab A
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
      </Tabs>,
    );
    await expect
      .element(screen.getByRole("tab", { name: "Tab A" }))
      .toHaveClass("sct-tabs-trigger my-class");
  });
});
