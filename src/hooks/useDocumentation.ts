import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  nodeCategories,
  getNodesByCategory,
  getNodeById,
  searchNodes,
  type Node,
} from '../data/nodes';
import useAnalytics from './useAnalytics';

const MOBILE_BREAKPOINT = 768;

export function useDocumentation() {
  const { categoryId, nodeId } = useParams();
  const navigate = useNavigate();
  const analytics = useAnalytics();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedCategory = categoryId;
  const selectedNode = nodeId ? getNodeById(nodeId) : undefined;
  const selectedCategoryObject = useMemo(
    () => nodeCategories.find((category) => category.id === selectedCategory) ?? null,
    [selectedCategory],
  );

  const filteredNodes = useMemo(() => {
    if (searchTerm.length >= 2) return searchNodes(searchTerm);
    if (selectedCategory) return getNodesByCategory(selectedCategory);
    return [];
  }, [searchTerm, selectedCategory]);

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
    return () => document.body.classList.remove('sidebar-open');
  }, [sidebarOpen]);

  useEffect(() => {
    if (isMobile && selectedNode) setSidebarOpen(false);
  }, [isMobile, selectedNode]);

  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((open) => !open), []);

  const selectCategory = useCallback(
    (category: string) => {
      navigate(`/documentation/${category}`);
      analytics.trackFeatureUsage('select_category', {
        category_id: category,
        category_name: nodeCategories.find((item) => item.id === category)?.name || category,
      });
    },
    [navigate, analytics],
  );

  const selectNode = useCallback(
    (node: Node) => {
      navigate(`/documentation/${node.category}/${node.id}`, { replace: true });
      analytics.trackNodeView(node.id, node.name, node.category);
    },
    [navigate, analytics],
  );

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      if (term.length >= 2) analytics.trackSearch(term, searchNodes(term).length);
    },
    [analytics],
  );

  const clearSearch = useCallback(() => setSearchTerm(''), []);

  const closeDetails = useCallback(() => {
    navigate(selectedCategory ? `/documentation/${selectedCategory}` : '/documentation');
  }, [navigate, selectedCategory]);

  const goHome = useCallback(() => navigate('/documentation'), [navigate]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (event.key !== 'Escape') return;
      if (sidebarOpen) {
        setSidebarOpen(false);
        return;
      }
      if (searchTerm) {
        setSearchTerm('');
        return;
      }
      if (selectedNode && selectedCategory) navigate(`/documentation/${selectedCategory}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, searchTerm, selectedCategory, selectedNode, sidebarOpen]);

  return {
    searchInputRef,
    searchTerm,
    isMobile,
    sidebarOpen,
    selectedCategory,
    selectedNode,
    selectedCategoryObject,
    filteredNodes,
    closeSidebar,
    toggleSidebar,
    selectCategory,
    selectNode,
    handleSearch,
    clearSearch,
    closeDetails,
    goHome,
  };
}
