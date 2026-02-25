import {
  TopBar,
  ContextHeader,
  ProofFooter,
  Button,
  Input,
  Card,
  Badge,
  PromptBox,
  SidePanel,
  ErrorState,
  EmptyState,
  PageShell,
  WorkspaceLayout,
} from './design-system';

export default function App() {
  return (
    <PageShell>
      {/* ── Top Bar ── */}
      <TopBar
        brand="KodNest Premium Build System"
        currentStep={2}
        totalSteps={6}
        status="in-progress"
      />

      {/* ── Context Header ── */}
      <ContextHeader
        title="Design System Reference"
        subtitle="Every component, token, and layout primitive available in the system."
      />

      {/* ── Workspace ── */}
      <WorkspaceLayout
        main={<PrimaryWorkspace />}
        side={
          <SidePanel
            heading="Step Explanation"
            description="Review each component below. Confirm tokens, spacing, and typography match the specification before proceeding."
            promptCode={`import { Button, Card, Input } from './design-system';`}
            onBuild={() => {}}
            onItWorked={() => {}}
            onError={() => {}}
            onScreenshot={() => {}}
          />
        }
      />

      {/* ── Proof Footer ── */}
      <ProofFooter />
    </PageShell>
  );
}

/* ─────────── Primary Workspace Content ─────────── */

function PrimaryWorkspace() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

      {/* ── Section: Color Tokens ── */}
      <Card title="Color Tokens" subtitle="Maximum four colors across the entire system.">
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <Swatch color="#F7F6F3" label="Background" />
          <Swatch color="#111111" label="Text" />
          <Swatch color="#8B0000" label="Accent" />
          <Swatch color="#D4D2CC" label="Border" />
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <Swatch color="#4A7C59" label="Success" />
          <Swatch color="#A68B2C" label="Warning" />
        </div>
      </Card>

      {/* ── Section: Typography ── */}
      <Card title="Typography" subtitle="Serif headings, sans-serif body, intentional scale.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
          <h1>Heading One — 40px Serif</h1>
          <h2>Heading Two — 32px Serif</h2>
          <h3>Heading Three — 24px Serif</h3>
          <p>
            Body text at 16px with 1.6-1.8 line height, max 720px width.
            Clean, readable, and deliberately spaced for comfortable scanning
            across long-form content blocks.
          </p>
        </div>
      </Card>

      {/* ── Section: Spacing ── */}
      <Card title="Spacing Scale" subtitle="Consistent 8 / 16 / 24 / 40 / 64 px scale.">
        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end', marginTop: 'var(--space-2)' }}>
          {[8, 16, 24, 40, 64].map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: s,
                height: s,
                backgroundColor: 'var(--color-accent)',
                borderRadius: 'var(--radius)',
              }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)' }}>{s}px</span>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Section: Buttons ── */}
      <Card title="Buttons" subtitle="Primary solid, secondary outlined, ghost minimal.">
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Card>

      {/* ── Section: Badges ── */}
      <Card title="Badges" subtitle="Status indicators with semantic color.">
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginTop: 'var(--space-2)' }}>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </Card>

      {/* ── Section: Inputs ── */}
      <Card title="Inputs" subtitle="Clean borders, clear focus, no heavy shadows.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-2)', maxWidth: 400 }}>
          <Input label="Project Name" placeholder="Enter project name" hint="Alphanumeric, no spaces." />
          <Input label="Description" placeholder="Describe your build..." multiline />
          <Input label="Email" placeholder="you@example.com" error="A valid email address is required." />
        </div>
      </Card>

      {/* ── Section: Prompt Box ── */}
      <Card title="Prompt Box" subtitle="Copyable code block for step instructions.">
        <div style={{ marginTop: 'var(--space-2)' }}>
          <PromptBox
            code={`Build a responsive dashboard layout using the KodNest design tokens. Use the spacing scale for all margins and padding.`}
          />
        </div>
      </Card>

      {/* ── Section: Error State ── */}
      <Card title="Error State" subtitle="Explain what went wrong and how to fix it.">
        <div style={{ marginTop: 'var(--space-2)' }}>
          <ErrorState
            title="Build failed"
            message="The deployment process could not complete because the entry file was not found."
            fix="Verify that src/main.jsx exists and is correctly referenced in your vite.config.js."
          />
        </div>
      </Card>

      {/* ── Section: Empty State ── */}
      <Card title="Empty State" subtitle="Provide next action, never feel dead.">
        <div style={{ marginTop: 'var(--space-2)' }}>
          <EmptyState
            title="No builds yet"
            message="Start your first build to see results here. Each build is tracked with proof checkpoints."
            action={<Button variant="primary">Start First Build</Button>}
          />
        </div>
      </Card>

    </div>
  );
}

/* ─────────── Swatch helper ─────────── */

function Swatch({ color, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 56,
        height: 56,
        backgroundColor: color,
        borderRadius: 'var(--radius)',
        border: '1px solid var(--color-border)',
      }} />
      <span style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-secondary)',
      }}>{label}</span>
      <span style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-tertiary)',
        fontFamily: 'monospace',
      }}>{color}</span>
    </div>
  );
}
