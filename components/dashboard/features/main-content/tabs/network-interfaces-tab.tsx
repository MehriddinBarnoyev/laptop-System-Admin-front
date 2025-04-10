"use client";

import { useState, useCallback, useMemo, memo } from "react";
import { Network, Copy, Check, Globe, Wifi, Server } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NetworkInterfacesTabProps {
  networkData: any;
}

// Memoized component for individual property display
const NetworkProperty = memo(
  ({
    propKey,
    propValue,
    interfaceName,
    addressIndex,
    copiedItem,
    onCopy,
  }: {
    propKey: string;
    propValue: any;
    interfaceName: string;
    addressIndex: number;
    copiedItem: string | null;
    onCopy: (id: string, data: any) => void;
  }) => {
    const copyId = `prop-${interfaceName}-${addressIndex}-${propKey}`;
    const displayValue =
      typeof propValue === "boolean"
        ? propValue
          ? "Yes"
          : "No"
        : String(propValue);

    return (
      <div className="bg-slate-800/30 p-2 rounded border border-slate-700/30 flex justify-between items-center">
        <div>
          <span className="text-slate-500">{propKey}:</span>
          <span className="text-slate-300 ml-1 font-mono">{displayValue}</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-slate-400 hover:text-slate-100"
                onClick={() => onCopy(copyId, propValue)}
              >
                {copiedItem === copyId ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy {propKey}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }
);

NetworkProperty.displayName = "NetworkProperty";

// Memoized component for JSON display
const JsonDisplay = memo(
  ({
    data,
    interfaceName,
    addressIndex,
    copiedItem,
    onCopy,
  }: {
    data: any;
    interfaceName: string;
    addressIndex: number;
    copiedItem: string | null;
    onCopy: (id: string, data: any) => void;
  }) => {
    const copyId = `json-${interfaceName}-${addressIndex}`;
    const jsonString = useMemo(() => JSON.stringify(data, null, 2), [data]);

    return (
      <div className="mt-3 p-3 bg-slate-800/30 rounded border border-slate-700/30 font-mono text-xs text-slate-400 overflow-auto max-h-32 relative">
        <pre>{jsonString}</pre>
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 bg-slate-900/50 text-slate-400 hover:text-slate-100"
                  onClick={() => onCopy(copyId, data)}
                >
                  {copiedItem === copyId ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy JSON</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    );
  }
);

JsonDisplay.displayName = "JsonDisplay";

// Memoized component for network address
const NetworkAddress = memo(
  ({
    iface,
    interfaceName,
    addressIndex,
    copiedItem,
    onCopy,
  }: {
    iface: any;
    interfaceName: string;
    addressIndex: number;
    copiedItem: string | null;
    onCopy: (id: string, data: any) => void;
  }) => {
    const copyId = `address-${interfaceName}-${addressIndex}`;

    // Memoize the entries to prevent re-renders
    const entries = useMemo(() => {
      return Object.entries(iface);
    }, [iface]);

    return (
      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-slate-300">
            {iface.family} - {iface.address}
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 text-slate-400 hover:text-slate-100"
                  onClick={() => onCopy(copyId, iface)}
                >
                  {copiedItem === copyId ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy address data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {entries.map(([key, value]) => (
            <NetworkProperty
              key={`${interfaceName}-${addressIndex}-${key}`}
              propKey={key}
              propValue={value}
              interfaceName={interfaceName}
              addressIndex={addressIndex}
              copiedItem={copiedItem}
              onCopy={onCopy}
            />
          ))}
        </div>

        <JsonDisplay
          data={iface}
          interfaceName={interfaceName}
          addressIndex={addressIndex}
          copiedItem={copiedItem}
          onCopy={onCopy}
        />
      </div>
    );
  }
);

NetworkAddress.displayName = "NetworkAddress";

// Memoized component for network interface
const NetworkInterface = memo(
  ({
    name,
    interfaces,
    copiedItem,
    onCopy,
  }: {
    name: string;
    interfaces: any[];
    copiedItem: string | null;
    onCopy: (id: string, data: any) => void;
  }) => {
    const copyId = `interface-${name}`;

    // Memoize the icon to prevent re-renders
    const InterfaceIcon = useMemo(() => {
      if (name.startsWith("lo")) return Server;
      if (name.startsWith("wl")) return Wifi;
      return Globe;
    }, [name]);

    return (
      <Card key={name} className="bg-slate-900/50 border-slate-700/50">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-slate-100 flex items-center text-base">
            <InterfaceIcon className="mr-2 h-5 w-5 text-blue-500" />
            {name}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={`${
                interfaces[0]?.internal
                  ? "bg-slate-700/50 text-slate-300 border-slate-600/50"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
              } text-xs`}
            >
              {interfaces[0]?.internal ? "Internal" : "External"}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-100"
                    onClick={() => onCopy(copyId, interfaces)}
                  >
                    {copiedItem === copyId ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy interface data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {interfaces.map((iface, idx) => (
              <NetworkAddress
                key={`${name}-${idx}-${iface.address}`}
                iface={iface}
                interfaceName={name}
                addressIndex={idx}
                copiedItem={copiedItem}
                onCopy={onCopy}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
);

NetworkInterface.displayName = "NetworkInterface";

// Main component
function NetworkInterfacesTab({ networkData }: NetworkInterfacesTabProps) {
  // Track which item has been copied for showing feedback
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Memoize the copy function to prevent re-renders
  const copyToClipboard = useCallback((id: string, data: any) => {
    const dataString =
      typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
    navigator.clipboard
      .writeText(dataString)
      .then(() => {
        setCopiedItem(id);
        setTimeout(() => setCopiedItem(null), 2000); // Reset after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }, []);

  // Memoize the network interfaces entries
  const networkEntries = useMemo(() => {
    return networkData ? Object.entries(networkData) : [];
  }, [networkData]);

  // Early return for no data
  if (!networkData) {
    return (
      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-6 text-center">
        <div className="text-slate-400">No network data available</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-slate-100 flex items-center">
          <Network className="mr-2 h-5 w-5 text-blue-500" />
          Network Interfaces
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
                onClick={() => copyToClipboard("all", networkData)}
              >
                {copiedItem === "all" ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy All
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy all network interfaces data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {networkEntries.map(([name, interfaces]) => (
          <NetworkInterface
            key={name}
            name={name}
            interfaces={interfaces as any[]}
            copiedItem={copiedItem}
            onCopy={copyToClipboard}
          />
        ))}
      </div>
    </div>
  );
}

// Export a memoized version of the component
export default memo(NetworkInterfacesTab);
