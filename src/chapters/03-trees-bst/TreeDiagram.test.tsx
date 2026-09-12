import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TreeDiagram from './TreeDiagram';
import { BST_INSERT_STEPS, BST_NODE_POS, BST_BASE_EDGES, BST_DEPTH_GUIDES } from './steps';

describe('TreeDiagram', () => {
  it('renders a labeled circle for every base node on step 1', () => {
    const { container } = render(
      <TreeDiagram scene={BST_INSERT_STEPS[0].scene} nodePositions={BST_NODE_POS} baseEdges={BST_BASE_EDGES} newNodeId="37" depthGuides={BST_DEPTH_GUIDES} badgeLabel="value = 37" />
    );
    const labels = Array.from(container.querySelectorAll('text')).map((t) => t.textContent);
    expect(labels).toEqual(expect.arrayContaining(['30', '15', '42', '45']));
    expect(labels).not.toContain('37');
  });

  it('renders the dashed "?" slot once a step introduces node 37 as slot state', () => {
    const slotStep = BST_INSERT_STEPS.find((s) => s.scene.nodes['37'] === 'slot')!;
    const { container } = render(
      <TreeDiagram scene={slotStep.scene} nodePositions={BST_NODE_POS} baseEdges={BST_BASE_EDGES} newNodeId="37" depthGuides={BST_DEPTH_GUIDES} badgeLabel="value = 37" />
    );
    const labels = Array.from(container.querySelectorAll('text')).map((t) => t.textContent);
    expect(labels).toContain('?');
  });

  it('renders node 37 with its real label once inserted', () => {
    const okStep = BST_INSERT_STEPS.find((s) => s.scene.nodes['37'] === 'ok')!;
    const { container } = render(
      <TreeDiagram scene={okStep.scene} nodePositions={BST_NODE_POS} baseEdges={BST_BASE_EDGES} newNodeId="37" depthGuides={BST_DEPTH_GUIDES} badgeLabel="value = 37" />
    );
    const labels = Array.from(container.querySelectorAll('text')).map((t) => t.textContent);
    expect(labels).toContain('37');
    // regression guard: 3 depth-guide lines + 4 tree edges (3 base edges + the 42-37 edge) must
    // all render once node 37 exists — depthGuides also render as <line>, not just tree edges
    expect(container.querySelectorAll('line').length).toBe(7);
  });

  it('renders exactly scene.edgeList when provided, ignoring baseEdges', () => {
    const { container } = render(
      <TreeDiagram
        scene={{ type: 'tree', nodes: { a: 'idle', b: 'idle' }, edgeList: [['a', 'b']] }}
        nodePositions={{ a: { x: 10, y: 10 }, b: { x: 50, y: 50 } }}
        baseEdges={[['a', 'z']]}
      />
    );
    expect(container.querySelectorAll('line').length).toBe(1);
  });
});
