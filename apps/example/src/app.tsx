import { useState } from "react";

// -- Components --
import { Button } from "@webscit/registry/components/button/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@webscit/registry/components/card/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@webscit/registry/components/tabs/tabs";
import { Input } from "@webscit/registry/components/input/input";
import { Textarea } from "@webscit/registry/components/textarea/textarea";
import { Label } from "@webscit/registry/components/label/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@webscit/registry/components/select/select";
import { Checkbox } from "@webscit/registry/components/checkbox/checkbox";
import { Switch } from "@webscit/registry/components/switch/switch";
import {
  RadioGroup,
  RadioGroupItem,
} from "@webscit/registry/components/radio-group/radio-group";
import { Badge } from "@webscit/registry/components/badge/badge";
import { Separator } from "@webscit/registry/components/separator/separator";
import { Slider } from "@webscit/registry/components/slider/slider";
import { Progress } from "@webscit/registry/components/progress/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@webscit/registry/components/table/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@webscit/registry/components/dialog/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@webscit/registry/components/alert-dialog/alert-dialog";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@webscit/registry/components/alert/alert";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@webscit/registry/components/accordion/accordion";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@webscit/registry/components/tooltip/tooltip";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@webscit/registry/components/breadcrumb/breadcrumb";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "@webscit/registry/components/popover/popover";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarInset,
  SidebarSeparator,
} from "@webscit/registry/components/sidebar/sidebar";
import { Skeleton } from "@webscit/registry/components/skeleton/skeleton";
import { Spinner } from "@webscit/registry/components/spinner/spinner";
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastContent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  useToastManager,
} from "@webscit/registry/components/toast/toast";
import {
  Field,
  FieldLabel,
  FieldDescription,
} from "@webscit/registry/components/field/field";

import "./app.css";

// ── Icons (inline SVGs to avoid external deps) ──

function IconFlask(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 3h6M10 3v7.4a2 2 0 0 1-.5 1.3L4 19a2 2 0 0 0 1.5 3h13a2 2 0 0 0 1.5-3l-5.5-7.3a2 2 0 0 1-.5-1.3V3" />
    </svg>
  );
}

function IconFolder(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  );
}

function IconDatabase(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}

function IconSettings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconPlus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function IconSun(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function IconMoon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function IconChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

function IconInfo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

// ── Sample data ──

const DATA_FILES = [
  {
    name: "sample_001.csv",
    size: "2.4 MB",
    rows: "12,847",
    status: "ready" as const,
  },
  {
    name: "sample_002.csv",
    size: "1.8 MB",
    rows: "9,231",
    status: "ready" as const,
  },
  {
    name: "calibration.json",
    size: "340 KB",
    rows: "—",
    status: "ready" as const,
  },
  {
    name: "raw_spectra.h5",
    size: "847 MB",
    rows: "1,204,000",
    status: "processing" as const,
  },
  { name: "metadata.yaml", size: "12 KB", rows: "—", status: "error" as const },
];

// ── Inner app (needs toast context) ──

function AppInner() {
  const [dark, setDark] = useState(false);
  const [confidence, setConfidence] = useState([95]);
  const [iterations, setIterations] = useState([1000]);
  const toastManager = useToastManager();

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute(
      "data-theme",
      next ? "dark" : "light",
    );
  };

  const handleCreate = () => {
    toastManager.add({
      title: "Experiment created",
      description: "Your experiment has been queued for processing.",
    });
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="page">
          {/* ── Sidebar ── */}
          <Sidebar>
            <SidebarHeader>
              <div
                className="flex items-center gap-2"
                style={{ padding: "0.5rem" }}
              >
                <IconFlask width="20" height="20" />
                <span className="font-medium">SCI Toolkit</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconFlask />
                        <span>Experiments</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>3</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconFolder />
                        <span>Projects</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconDatabase />
                        <span>Datasets</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconChart />
                        <span>Results</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconSettings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="text-sm text-muted" style={{ padding: "0.5rem" }}>
                v0.1.0
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* ── Main content ── */}
          <SidebarInset>
            <div className="page-main">
              {/* Header */}
              <header className="page-header">
                <SidebarTrigger />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Experiments</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>New Experiment</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <div style={{ flex: 1 }} />
                <Tooltip>
                  <TooltipTrigger
                    className="theme-toggle"
                    onClick={toggleTheme}
                  >
                    {dark ? <IconSun /> : <IconMoon />}
                  </TooltipTrigger>
                  <TooltipContent>Toggle theme</TooltipContent>
                </Tooltip>
              </header>

              {/* Body */}
              <main className="page-content">
                <div className="flex-col gap-6">
                  {/* Title area */}
                  <div>
                    <h1 className="page-header-title">New Experiment</h1>
                    <p
                      className="text-sm text-muted"
                      style={{ marginTop: "0.25rem" }}
                    >
                      Configure and launch a new analysis experiment.
                    </p>
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="general">
                    <TabsList>
                      <TabsTrigger value="general">General</TabsTrigger>
                      <TabsTrigger value="parameters">Parameters</TabsTrigger>
                      <TabsTrigger value="data">Data Sources</TabsTrigger>
                      <TabsTrigger value="notifications">
                        Notifications
                      </TabsTrigger>
                    </TabsList>

                    {/* ── General tab ── */}
                    <TabsContent value="general">
                      <div
                        className="flex-col gap-6"
                        style={{ paddingTop: "1.5rem" }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Experiment Details</CardTitle>
                            <CardDescription>
                              Basic information about your experiment.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex-col gap-4">
                              <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input placeholder="e.g. Protein folding analysis Q2" />
                              </Field>

                              <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                  placeholder="Describe the goals and methodology..."
                                  rows={3}
                                />
                              </Field>

                              <div className="grid-2">
                                <Field>
                                  <FieldLabel>Type</FieldLabel>
                                  <Select defaultValue="spectroscopy">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="spectroscopy">
                                        Spectroscopy
                                      </SelectItem>
                                      <SelectItem value="chromatography">
                                        Chromatography
                                      </SelectItem>
                                      <SelectItem value="microscopy">
                                        Microscopy
                                      </SelectItem>
                                      <SelectItem value="genomics">
                                        Genomics
                                      </SelectItem>
                                      <SelectItem value="proteomics">
                                        Proteomics
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Field>

                                <Field>
                                  <FieldLabel>Priority</FieldLabel>
                                  <Select defaultValue="normal">
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="low">Low</SelectItem>
                                      <SelectItem value="normal">
                                        Normal
                                      </SelectItem>
                                      <SelectItem value="high">High</SelectItem>
                                      <SelectItem value="critical">
                                        Critical
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </Field>
                              </div>

                              <Field>
                                <FieldLabel>Tags</FieldLabel>
                                <FieldDescription>
                                  Assign tags for filtering and organization.
                                </FieldDescription>
                                <div
                                  className="flex gap-2"
                                  style={{
                                    flexWrap: "wrap",
                                    marginTop: "0.5rem",
                                  }}
                                >
                                  <Badge>protein</Badge>
                                  <Badge variant="secondary">folding</Badge>
                                  <Badge variant="secondary">q2-2026</Badge>
                                  <Badge variant="outline">
                                    <IconPlus width="12" height="12" /> Add tag
                                  </Badge>
                                </div>
                              </Field>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Status card with skeleton loading demo */}
                        <Card>
                          <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>
                              Latest runs from your team.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex-col gap-3">
                              <div className="flex items-center gap-3">
                                <Skeleton
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                  }}
                                />
                                <div
                                  className="flex-col gap-1"
                                  style={{ flex: 1 }}
                                >
                                  <Skeleton
                                    style={{ width: "60%", height: 14 }}
                                  />
                                  <Skeleton
                                    style={{ width: "40%", height: 12 }}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Skeleton
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                  }}
                                />
                                <div
                                  className="flex-col gap-1"
                                  style={{ flex: 1 }}
                                >
                                  <Skeleton
                                    style={{ width: "75%", height: 14 }}
                                  />
                                  <Skeleton
                                    style={{ width: "50%", height: 12 }}
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Skeleton
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                  }}
                                />
                                <div
                                  className="flex-col gap-1"
                                  style={{ flex: 1 }}
                                >
                                  <Skeleton
                                    style={{ width: "55%", height: 14 }}
                                  />
                                  <Skeleton
                                    style={{ width: "35%", height: 12 }}
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* ── Parameters tab ── */}
                    <TabsContent value="parameters">
                      <div
                        className="flex-col gap-6"
                        style={{ paddingTop: "1.5rem" }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Analysis Method</CardTitle>
                            <CardDescription>
                              Choose the statistical method for your experiment.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <RadioGroup
                              defaultValue="bayesian"
                              aria-label="Analysis method"
                            >
                              <div className="flex-col gap-3">
                                <label className="flex items-center gap-3">
                                  <RadioGroupItem value="bayesian" />
                                  <div>
                                    <div className="font-medium">
                                      Bayesian Inference
                                    </div>
                                    <div className="text-sm text-muted">
                                      Posterior probability estimation with MCMC
                                      sampling.
                                    </div>
                                  </div>
                                </label>
                                <label className="flex items-center gap-3">
                                  <RadioGroupItem value="frequentist" />
                                  <div>
                                    <div className="font-medium">
                                      Frequentist
                                    </div>
                                    <div className="text-sm text-muted">
                                      Hypothesis testing with p-value
                                      significance.
                                    </div>
                                  </div>
                                </label>
                                <label className="flex items-center gap-3">
                                  <RadioGroupItem value="ml" />
                                  <div>
                                    <div className="font-medium">
                                      Machine Learning
                                    </div>
                                    <div className="text-sm text-muted">
                                      Neural network-based pattern recognition.
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </RadioGroup>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Tuning Parameters</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex-col gap-6">
                              <div className="flex-col gap-2">
                                <div className="flex justify-between">
                                  <Label>Confidence Level</Label>
                                  <span className="text-sm text-muted">
                                    {confidence[0]}%
                                  </span>
                                </div>
                                <Slider
                                  value={confidence}
                                  onValueChange={setConfidence}
                                  min={80}
                                  max={99}
                                  step={1}
                                />
                              </div>

                              <Separator />

                              <div className="flex-col gap-2">
                                <div className="flex justify-between">
                                  <Label>Max Iterations</Label>
                                  <span className="text-sm text-muted">
                                    {iterations[0]?.toLocaleString()}
                                  </span>
                                </div>
                                <Slider
                                  value={iterations}
                                  onValueChange={setIterations}
                                  min={100}
                                  max={10000}
                                  step={100}
                                />
                              </div>

                              <Separator />

                              <div className="flex-col gap-3">
                                <Label>Options</Label>
                                <label className="flex items-center gap-2">
                                  <Checkbox defaultChecked />
                                  <span className="text-sm">
                                    Enable cross-validation
                                  </span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <Checkbox defaultChecked />
                                  <span className="text-sm">
                                    Normalize input data
                                  </span>
                                </label>
                                <label className="flex items-center gap-2">
                                  <Checkbox />
                                  <span className="text-sm">
                                    Use GPU acceleration
                                  </span>
                                </label>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Accordion for advanced settings */}
                        <Accordion>
                          <AccordionItem>
                            <AccordionTrigger>
                              Advanced Parameters
                            </AccordionTrigger>
                            <AccordionContent>
                              <div
                                className="flex-col gap-4"
                                style={{ padding: "0.5rem 0" }}
                              >
                                <Field>
                                  <FieldLabel>Learning Rate</FieldLabel>
                                  <Input
                                    type="number"
                                    defaultValue="0.001"
                                    step="0.0001"
                                  />
                                </Field>
                                <Field>
                                  <FieldLabel>Batch Size</FieldLabel>
                                  <Input type="number" defaultValue="32" />
                                </Field>
                                <Field>
                                  <FieldLabel>Random Seed</FieldLabel>
                                  <Input type="number" defaultValue="42" />
                                </Field>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem>
                            <AccordionTrigger>
                              Convergence Criteria
                            </AccordionTrigger>
                            <AccordionContent>
                              <div
                                className="flex-col gap-4"
                                style={{ padding: "0.5rem 0" }}
                              >
                                <Field>
                                  <FieldLabel>Tolerance</FieldLabel>
                                  <Input type="number" defaultValue="1e-6" />
                                </Field>
                                <Field>
                                  <FieldLabel>Patience (epochs)</FieldLabel>
                                  <Input type="number" defaultValue="10" />
                                </Field>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </TabsContent>

                    {/* ── Data Sources tab ── */}
                    <TabsContent value="data">
                      <div
                        className="flex-col gap-6"
                        style={{ paddingTop: "1.5rem" }}
                      >
                        <Alert>
                          <IconInfo width="16" height="16" />
                          <AlertTitle>Data Validation</AlertTitle>
                          <AlertDescription>
                            All uploaded files are validated against the
                            experiment schema before processing begins.
                          </AlertDescription>
                        </Alert>

                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between w-full">
                              <div>
                                <CardTitle>Input Files</CardTitle>
                                <CardDescription>
                                  Manage data sources for this experiment.
                                </CardDescription>
                              </div>
                              <Popover>
                                <PopoverTrigger>
                                  <Button variant="outline" size="sm">
                                    <IconPlus /> Add File
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent style={{ width: 280 }}>
                                  <PopoverTitle>Add Data Source</PopoverTitle>
                                  <PopoverDescription>
                                    Upload a file or connect to a remote source.
                                  </PopoverDescription>
                                  <div
                                    className="flex-col gap-3"
                                    style={{ marginTop: "0.75rem" }}
                                  >
                                    <Input placeholder="File path or URL..." />
                                    <div className="flex gap-2">
                                      <Button size="sm">Upload</Button>
                                      <PopoverClose>
                                        <Button variant="ghost" size="sm">
                                          Cancel
                                        </Button>
                                      </PopoverClose>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>File</TableHead>
                                  <TableHead>Size</TableHead>
                                  <TableHead>Rows</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {DATA_FILES.map((file) => (
                                  <TableRow key={file.name}>
                                    <TableCell className="font-medium">
                                      {file.name}
                                    </TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell>{file.rows}</TableCell>
                                    <TableCell>
                                      {file.status === "ready" && (
                                        <Badge variant="secondary">Ready</Badge>
                                      )}
                                      {file.status === "processing" && (
                                        <Badge>
                                          <Spinner size="sm" /> Processing
                                        </Badge>
                                      )}
                                      {file.status === "error" && (
                                        <Badge variant="destructive">
                                          Error
                                        </Badge>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle>Processing Progress</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex-col gap-4">
                              <div className="flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                  <span>Validation</span>
                                  <span className="text-muted">100%</span>
                                </div>
                                <Progress value={100} />
                              </div>
                              <div className="flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                  <span>Preprocessing</span>
                                  <span className="text-muted">68%</span>
                                </div>
                                <Progress value={68} />
                              </div>
                              <div className="flex-col gap-1">
                                <div className="flex justify-between text-sm">
                                  <span>Feature extraction</span>
                                  <span className="text-muted">0%</span>
                                </div>
                                <Progress value={0} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    {/* ── Notifications tab ── */}
                    <TabsContent value="notifications">
                      <div
                        className="flex-col gap-6"
                        style={{ paddingTop: "1.5rem" }}
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle>Email Notifications</CardTitle>
                            <CardDescription>
                              Choose when you want to be notified about this
                              experiment.
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex-col gap-4">
                              <div className="field-row">
                                <div className="field-row-label">
                                  <span className="font-medium text-sm">
                                    Experiment Complete
                                  </span>
                                  <span className="text-sm text-muted">
                                    Get notified when the run finishes.
                                  </span>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <Separator />
                              <div className="field-row">
                                <div className="field-row-label">
                                  <span className="font-medium text-sm">
                                    Error Alerts
                                  </span>
                                  <span className="text-sm text-muted">
                                    Immediate alert on processing failures.
                                  </span>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <Separator />
                              <div className="field-row">
                                <div className="field-row-label">
                                  <span className="font-medium text-sm">
                                    Progress Updates
                                  </span>
                                  <span className="text-sm text-muted">
                                    Periodic status reports during long runs.
                                  </span>
                                </div>
                                <Switch />
                              </div>
                              <Separator />
                              <div className="field-row">
                                <div className="field-row-label">
                                  <span className="font-medium text-sm">
                                    Team Activity
                                  </span>
                                  <span className="text-sm text-muted">
                                    Notify when collaborators make changes.
                                  </span>
                                </div>
                                <Switch />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Alert variant="destructive">
                          <AlertTitle>Quota Warning</AlertTitle>
                          <AlertDescription>
                            You have used 847 of 1,000 compute hours this
                            billing period. Large experiments may be throttled.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Footer actions */}
                  <Separator />
                  <div className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="outline">Preview Configuration</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Experiment Configuration</DialogTitle>
                          <DialogDescription>
                            Review the configuration before creating the
                            experiment.
                          </DialogDescription>
                        </DialogHeader>
                        <pre
                          style={{
                            background: "var(--sct-color-muted)",
                            padding: "1rem",
                            borderRadius: "var(--sct-radius-md)",
                            fontSize: "var(--sct-font-size-sm)",
                            overflow: "auto",
                            maxHeight: 300,
                          }}
                        >
                          {JSON.stringify(
                            {
                              name: "Protein folding analysis Q2",
                              type: "spectroscopy",
                              method: "bayesian",
                              confidence: confidence[0],
                              maxIterations: iterations[0],
                              crossValidation: true,
                              normalize: true,
                              gpuAcceleration: false,
                              dataSources: DATA_FILES.map((f) => f.name),
                            },
                            null,
                            2,
                          )}
                        </pre>
                        <DialogFooter>
                          <DialogClose>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <div className="flex gap-2">
                      <Button variant="ghost">Save as Draft</Button>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Button>Create Experiment</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Create Experiment?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will queue the experiment for processing.
                              Compute resources will be allocated immediately.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleCreate}>
                              Create
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </SidebarInset>
        </div>

        {/* Toast viewport */}
        <ToastViewport>
          {toastManager.toasts.map((toast) => (
            <Toast key={toast.id} toast={toast}>
              <ToastContent>
                <ToastTitle>{toast.title}</ToastTitle>
                <ToastDescription>
                  {String(toast.description ?? "")}
                </ToastDescription>
              </ToastContent>
              <ToastClose>Dismiss</ToastClose>
            </Toast>
          ))}
        </ToastViewport>
      </SidebarProvider>
    </TooltipProvider>
  );
}

// ── Root ──

export function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
