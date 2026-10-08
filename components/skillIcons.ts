// Icon mapping for the Technical Skills icon view.
// Keys match the exact skill strings in lib/data.ts.
// Non–Simple Icons picks:
//   - Java → FaJava: the coffee cup reads as "Java" better than SiOpenjdk.
//   - NeonDB → FaDatabase: no Neon icon ships in this react-icons version.
//   - SQL → TbSql: generic SQL mark (Tabler).
import type { IconType } from 'react-icons';
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiC,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJquery,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiFastapi,
  SiDjango,
  SiPostgresql,
  SiSqlite,
  SiGit,
  SiFigma,
  SiVercel,
  SiAmazonwebservices,
  SiGooglecloud,
  SiOpenai,
  SiClaude,
  SiGooglegemini,
  SiN8N,
} from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';
import { TbSql } from 'react-icons/tb';
import { FiCode } from 'react-icons/fi';

export const SKILL_ICONS: Record<string, IconType> = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Java: FaJava,
  C: SiC,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  Jquery: SiJquery,
  'Node.js': SiNodedotjs,
  NestJS: SiNestjs,
  Express: SiExpress,
  FastAPI: SiFastapi,
  'Django + DRF': SiDjango, // DRF ships no standalone brand icon; reuse the Django mark
  SQL: TbSql,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  NeonDB: FaDatabase,
  Git: SiGit,
  Figma: SiFigma,
  Vercel: SiVercel,
  AWS: SiAmazonwebservices,
  GCP: SiGooglecloud,
  Codex: SiOpenai, // OpenAI mark: Codex has no standalone brand icon
  Claude: SiClaude,
  Gemini: SiGooglegemini,
  n8n: SiN8N,
};

export function getSkillIcon(name: string): IconType {
  return SKILL_ICONS[name] ?? FiCode;
}
