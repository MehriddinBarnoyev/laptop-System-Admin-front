"use client";

import StorageItem from "@/components/dashboard/ui/storage-item";

/**
 * StorageTab displays information about system storage devices
 * Shows details like capacity, usage, and type for each storage device
 */
export default function StorageTab() {
  // In a real application, this data would come from an API or context
  const storageDevices = [
    { name: "System Drive (C:)", total: 512, used: 324, type: "SSD" },
    { name: "Data Drive (D:)", total: 2048, used: 1285, type: "HDD" },
    { name: "Backup Drive (E:)", total: 4096, used: 1865, type: "HDD" },
    { name: "External Drive (F:)", total: 1024, used: 210, type: "SSD" },
  ];

  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storageDevices.map((device) => (
          <StorageItem
            key={device.name}
            name={device.name}
            total={device.total}
            used={device.used}
            type={device.type}
          />
        ))}
      </div>
    </div>
  );
}
