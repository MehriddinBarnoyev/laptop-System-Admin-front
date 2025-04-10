"use client";

import { useDashboard } from "@/components/dashboard/context/dashboard-context";
import SecurityAlertsSection from "./security-alerts-section";
import CommunicationsLogCard from "./communication-log-card";
import SystemOverviewCard from "./system-overwiev-card";

/**
 * MainContent component serves as the container for the primary dashboard content
 * It organizes the layout of the main dashboard sections and passes data to child components
 */
export default function MainContent() {
  const {
    cpuUsage,
    memoryUsage,
    networkStatus,
    systemStatus,
    securityLevel,
    rawData,
    error,
    lastFetchTime,
  } = useDashboard();

  // Format CPU model and speed if available
  const cpuDetail = rawData?.cpu?.[0]
    ? `${rawData.cpu[0].model.substring(0, 15)}... | ${
        rawData.cpu[0].speed / 1000
      } GHz`
    : "3.8 GHz | 12 Cores";

  // Format memory details if available
  const memoryDetail = rawData?.memory
    ? `${Math.round(
        rawData.memory.used / (1024 * 1024 * 1024)
      )} GB / ${Math.round(rawData.memory.total / (1024 * 1024 * 1024))} GB`
    : "16.4 GB / 24 GB";

  // Network detail would be calculated from network interfaces
  const networkDetail = rawData?.networkInterfaces
    ? `${Object.keys(rawData.networkInterfaces).length} interfaces active`
    : "1.2 GB/s | 42ms";

  return (
    <div className="col-span-12 md:col-span-9 lg:col-span-7">
      <div className="grid gap-6">
        {/* System Overview */}
        <SystemOverviewCard
          cpuUsage={cpuUsage}
          memoryUsage={memoryUsage}
          networkStatus={networkStatus}
          cpuDetail={cpuDetail}
          memoryDetail={memoryDetail}
          networkDetail={networkDetail}
          error={error}
          lastFetchTime={lastFetchTime}
          rawData={rawData}
        />

        {/* Security & Alerts */}
        {/* <SecurityAlertsSection securityLevel={securityLevel} /> */}

        {/* Communications */}
        <CommunicationsLogCard />
      </div>
    </div>
  );
}
