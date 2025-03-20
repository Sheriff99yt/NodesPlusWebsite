/**
 * PerformanceMonitor.ts
 * Client-side performance monitoring for static sites
 */

// Interface for performance data
interface PerformanceData {
  timestamp: number;
  navigationTiming?: Partial<PerformanceNavigationTiming>;
  loadMetrics: {
    domContentLoaded?: number;
    domInteractive?: number;
    loadTime?: number;
    firstPaint?: number;
    firstContentfulPaint?: number;
  };
  resourceMetrics?: {
    totalResources: number;
    totalSize: number;
    imageSize: number;
    scriptSize: number;
    cssSize: number;
    fontSize: number;
    otherSize: number;
  };
  memoryInfo?: {
    totalJSHeapSize?: number;
    usedJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  };
}

// Store for performance data
let performanceData: PerformanceData | null = null;

// Determine if we're in development mode
const isDevelopment = (): boolean => {
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.port === '5173' || 
         window.location.port === '5174';
};

// Collect navigation timing metrics
const collectNavigationTiming = (): Partial<PerformanceNavigationTiming> | undefined => {
  if (!window.performance || !window.performance.timing) {
    return undefined;
  }

  try {
    // Use newer Navigation Timing API if available
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      return {
        domComplete: navEntry.domComplete,
        domContentLoadedEventEnd: navEntry.domContentLoadedEventEnd,
        domInteractive: navEntry.domInteractive,
        loadEventEnd: navEntry.loadEventEnd,
        responseEnd: navEntry.responseEnd,
        responseStart: navEntry.responseStart,
        fetchStart: navEntry.fetchStart,
      };
    }
  } catch (e) {
    console.warn('Navigation Timing API error:', e);
  }

  return undefined;
};

// Get memory usage info
const getMemoryInfo = () => {
  if (window.performance && (performance as any).memory) {
    const memoryInfo = (performance as any).memory;
    return {
      totalJSHeapSize: memoryInfo.totalJSHeapSize,
      usedJSHeapSize: memoryInfo.usedJSHeapSize,
      jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit,
    };
  }
  return undefined;
};

// Collect resource timing information
const collectResourceMetrics = () => {
  if (!window.performance || !performance.getEntriesByType) {
    return undefined;
  }

  try {
    const resources = performance.getEntriesByType('resource');
    let totalSize = 0;
    let imageSize = 0;
    let scriptSize = 0;
    let cssSize = 0;
    let fontSize = 0;
    let otherSize = 0;

    resources.forEach((resource: any) => {
      const size = resource.transferSize || resource.encodedBodySize || 0;
      totalSize += size;

      if (resource.initiatorType === 'img' || /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(resource.name)) {
        imageSize += size;
      } else if (resource.initiatorType === 'script' || /\.js$/i.test(resource.name)) {
        scriptSize += size;
      } else if (resource.initiatorType === 'css' || /\.css$/i.test(resource.name)) {
        cssSize += size;
      } else if (/\.(woff|woff2|ttf|otf|eot)$/i.test(resource.name)) {
        fontSize += size;
      } else {
        otherSize += size;
      }
    });

    return {
      totalResources: resources.length,
      totalSize,
      imageSize,
      scriptSize,
      cssSize,
      fontSize,
      otherSize,
    };
  } catch (e) {
    console.warn('Resource Timing API error:', e);
    return undefined;
  }
};

// Collect paint timing metrics
const collectPaintMetrics = () => {
  if (!window.performance || !performance.getEntriesByType) {
    return { firstPaint: undefined, firstContentfulPaint: undefined };
  }

  try {
    const paintEntries = performance.getEntriesByType('paint');
    let firstPaint;
    let firstContentfulPaint;

    paintEntries.forEach((entry) => {
      if (entry.name === 'first-paint') {
        firstPaint = entry.startTime;
      } else if (entry.name === 'first-contentful-paint') {
        firstContentfulPaint = entry.startTime;
      }
    });

    return { firstPaint, firstContentfulPaint };
  } catch (e) {
    console.warn('Paint Timing API error:', e);
    return { firstPaint: undefined, firstContentfulPaint: undefined };
  }
};

// Initialize the performance monitoring
export const initPerformanceMonitoring = (): void => {
  if (typeof window === 'undefined') return; // Safety check for SSR
  
  // Wait for page to fully load before collecting metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigationTiming = collectNavigationTiming();
      const paintMetrics = collectPaintMetrics();
      const resourceMetrics = collectResourceMetrics();
      const memoryInfo = getMemoryInfo();
      
      // Calculate basic load metrics
      const loadMetrics = {
        domContentLoaded: navigationTiming?.domContentLoadedEventEnd,
        domInteractive: navigationTiming?.domInteractive,
        loadTime: navigationTiming?.loadEventEnd,
        ...paintMetrics
      };
      
      // Store the collected data
      performanceData = {
        timestamp: Date.now(),
        navigationTiming,
        loadMetrics,
        resourceMetrics,
        memoryInfo
      };
      
      // Log results to console in development
      if (isDevelopment()) {
        console.group('Performance Metrics');
        console.log('Load Metrics:', loadMetrics);
        console.log('Resource Metrics:', resourceMetrics);
        console.log('Memory Info:', memoryInfo);
        console.groupEnd();
      }
    }, 100); // Small delay to ensure all metrics are available
  });
};

// Get performance data
export const getPerformanceData = (): PerformanceData | null => {
  return performanceData;
};

// Log performance data to console
export const logPerformanceData = (): void => {
  if (performanceData) {
    console.group('NodesPlus Website Performance Data');
    console.log('Collected at:', new Date(performanceData.timestamp).toLocaleString());
    
    if (performanceData.loadMetrics) {
      console.group('Page Load Metrics');
      const { loadMetrics } = performanceData;
      if (loadMetrics.domContentLoaded) console.log('DOM Content Loaded:', Math.round(loadMetrics.domContentLoaded), 'ms');
      if (loadMetrics.domInteractive) console.log('DOM Interactive:', Math.round(loadMetrics.domInteractive), 'ms');
      if (loadMetrics.loadTime) console.log('Page Load Time:', Math.round(loadMetrics.loadTime), 'ms');
      if (loadMetrics.firstPaint) console.log('First Paint:', Math.round(loadMetrics.firstPaint), 'ms');
      if (loadMetrics.firstContentfulPaint) console.log('First Contentful Paint:', Math.round(loadMetrics.firstContentfulPaint), 'ms');
      console.groupEnd();
    }
    
    if (performanceData.resourceMetrics) {
      console.group('Resource Metrics');
      const { resourceMetrics } = performanceData;
      console.log('Total Resources:', resourceMetrics.totalResources);
      console.log('Total Size:', Math.round(resourceMetrics.totalSize / 1024), 'KB');
      console.log('Image Size:', Math.round(resourceMetrics.imageSize / 1024), 'KB');
      console.log('Script Size:', Math.round(resourceMetrics.scriptSize / 1024), 'KB');
      console.log('CSS Size:', Math.round(resourceMetrics.cssSize / 1024), 'KB');
      console.log('Font Size:', Math.round(resourceMetrics.fontSize / 1024), 'KB');
      console.groupEnd();
    }
    
    console.groupEnd();
  } else {
    console.warn('Performance data not available. Make sure initPerformanceMonitoring() has been called.');
  }
};

// Export as default object
export default {
  initPerformanceMonitoring,
  getPerformanceData,
  logPerformanceData
}; 