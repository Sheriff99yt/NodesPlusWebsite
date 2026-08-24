import { nodeCategories } from '../data/nodes';
import { useTheme } from '../context/ThemeContext';
import { useDocumentation } from '../hooks/useDocumentation';
import PageSeo from '../components/common/PageSeo';
import StructuredData from '../components/common/StructuredData';
import DocsLanding from '../components/docs/DocsLanding';
import DocsSidebar from '../components/docs/DocsSidebar';
import NodeDetailsPanel from '../components/docs/NodeDetailsPanel';
import CategoryDetailsPanel from '../components/docs/CategoryDetailsPanel';
import '../styles/Documentation.css';
import '../styles/docs-ux.css';

const Documentation = () => {
  const { theme } = useTheme();
  const docs = useDocumentation();
  const {
    selectedNode,
    selectedCategory,
    selectedCategoryObject,
    filteredNodes,
    isMobile,
    sidebarOpen,
  } = docs;

  const title = selectedNode
    ? `${selectedNode.name} — Nodes Plus Docs`
    : selectedCategoryObject
      ? `${selectedCategoryObject.name} — Nodes Plus Docs`
      : 'Documentation — Nodes Plus Docs';
  const description = selectedNode
    ? selectedNode.shortDescription || selectedNode.longDescription || `Docs for ${selectedNode.name}.`
    : selectedCategoryObject
      ? selectedCategoryObject.description || `${selectedCategoryObject.name} nodes.`
      : 'Browse Nodes Plus Blueprint nodes by category.';
  const path = selectedNode
    ? `/documentation/${selectedNode.category}/${selectedNode.id}`
    : selectedCategory
      ? `/documentation/${selectedCategory}`
      : '/documentation';
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Documentation', path: '/documentation' },
  ];
  if (selectedCategoryObject) {
    breadcrumbs.push({ name: selectedCategoryObject.name, path: `/documentation/${selectedCategoryObject.id}` });
  }
  if (selectedNode) breadcrumbs.push({ name: selectedNode.name, path: path });

  return (
    <div className={`documentation-page ${theme}`}>
      <PageSeo title={title} description={description} path={path} type="article" />
      <StructuredData pageType="documentation" title={title} description={description} path={path} breadcrumbs={breadcrumbs} />

      <div className={`documentation-container ${isMobile ? 'mobile-view' : ''} ${sidebarOpen ? 'sidebar-visible' : ''} ${theme}`}>
        <DocsSidebar
          theme={theme}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          searchTerm={docs.searchTerm}
          searchInputRef={docs.searchInputRef}
          selectedCategory={selectedCategory}
          selectedNode={selectedNode}
          filteredNodes={filteredNodes}
          onSearch={docs.handleSearch}
          onClearSearch={docs.clearSearch}
          onSelectCategory={docs.selectCategory}
          onSelectNode={docs.selectNode}
          onToggleSidebar={docs.toggleSidebar}
          onCloseSidebar={docs.closeSidebar}
        />

        <div className="docs-main-content" role="main">
          {selectedNode ? (
            <NodeDetailsPanel node={selectedNode} highlightTerm={docs.searchTerm} onClose={docs.closeDetails} />
          ) : selectedCategory && selectedCategoryObject ? (
            <CategoryDetailsPanel
              category={selectedCategoryObject}
              nodes={filteredNodes}
              onSelectNode={docs.selectNode}
              onBack={docs.goHome}
            />
          ) : (
            <DocsLanding categories={nodeCategories} onSelectCategory={docs.selectCategory} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Documentation;
