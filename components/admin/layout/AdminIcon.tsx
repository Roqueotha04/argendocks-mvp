import type { ComponentType } from "react";
import type { AdminIconName } from "@/config/admin.ui";
import {
  AnchorIcon,
  ChartIcon,
  GridIcon,
  HandshakeIcon,
  InboxIcon,
  MessageEditIcon,
  UsersIcon,
} from "@/components/ui/icons";

const iconComponents: Record<AdminIconName, ComponentType<{ className?: string }>> = {
  summary: GridIcon,
  analytics: ChartIcon,
  ports: AnchorIcon,
  suggestions: MessageEditIcon,
  partners: HandshakeIcon,
  users: UsersIcon,
  inquiries: InboxIcon,
};

export function AdminIcon({ name, className }: { name: AdminIconName; className?: string }) {
  const Icon = iconComponents[name];
  return <Icon className={className} />;
}
