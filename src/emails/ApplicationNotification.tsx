import * as React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Row,
  Column,
  Link,
} from 'react-email';

export interface ApplicationNotificationProps {
  name: string;
  email: string;
  jobSlug: string;
  jobTitle: string;
  message: string;
  cvFilename?: string;
}

const GOLD = '#C09B5B';
const DARK = '#0A0A0A';
const SURFACE = '#F9F9F9';
const MUTED = '#6B7280';

export function ApplicationNotification({
  name,
  email,
  jobSlug,
  jobTitle,
  message,
  cvFilename,
}: ApplicationNotificationProps) {
  return (
    <Html lang="uk">
      <Head />
      <Body
        style={{
          backgroundColor: SURFACE,
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: 600,
            margin: '0 auto',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Header */}
          <Section style={{ backgroundColor: DARK, padding: '28px 40px' }}>
            <Text
              style={{
                color: GOLD,
                fontSize: 22,
                fontWeight: 800,
                margin: 0,
                letterSpacing: '-0.5px',
              }}
            >
              ettoryx
            </Text>
          </Section>

          {/* Title bar */}
          <Section
            style={{
              borderLeft: `4px solid ${GOLD}`,
              padding: '20px 40px',
              backgroundColor: '#fff',
            }}
          >
            <Heading
              as="h1"
              style={{ fontSize: 20, color: DARK, margin: 0, fontWeight: 700 }}
            >
              Нова заявка на вакансію
            </Heading>
            <Text style={{ color: MUTED, fontSize: 13, margin: '4px 0 0' }}>
              Позиція: <strong style={{ color: DARK }}>{jobTitle}</strong>
              {' · '}
              <Link
                href={`https://ettoryx.com/uk/career/${jobSlug}`}
                style={{ color: GOLD, fontSize: 13 }}
              >
                Переглянути вакансію
              </Link>
            </Text>
          </Section>

          <Hr style={{ margin: 0, borderColor: '#E5E7EB' }} />

          {/* Applicant fields */}
          <Section style={{ padding: '28px 40px' }}>
            <Row>
              <Column
                style={{ width: '50%', paddingRight: 12, verticalAlign: 'top' }}
              >
                <Field label="Ім'я" value={name} />
              </Column>
              <Column
                style={{ width: '50%', paddingLeft: 12, verticalAlign: 'top' }}
              >
                <Field label="Email">
                  <Link
                    href={`mailto:${email}`}
                    style={{ color: GOLD, fontSize: 15 }}
                  >
                    {email}
                  </Link>
                </Field>
              </Column>
            </Row>

            {cvFilename && (
              <Row style={{ marginTop: 16 }}>
                <Column>
                  <Field label="Резюме (CV)">
                    <Text
                      style={{
                        color: DARK,
                        fontSize: 15,
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      📎 {cvFilename}{' '}
                      <span style={{ color: MUTED, fontSize: 13 }}>
                        (вкладено до листа)
                      </span>
                    </Text>
                  </Field>
                </Column>
              </Row>
            )}

            <Hr style={{ margin: '24px 0', borderColor: '#E5E7EB' }} />

            {/* Cover message */}
            <Text
              style={{
                color: MUTED,
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                margin: '0 0 8px',
              }}
            >
              Супровідний лист
            </Text>
            <Section
              style={{
                backgroundColor: SURFACE,
                borderRadius: 8,
                padding: '16px 20px',
              }}
            >
              <Text
                style={{
                  color: DARK,
                  fontSize: 15,
                  lineHeight: 1.6,
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message}
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: DARK, padding: '20px 40px' }}>
            <Text style={{ color: '#6B7280', fontSize: 12, margin: 0 }}>
              © {new Date().getFullYear()} ettoryx · info@ettoryx.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <Text
        style={{
          color: MUTED,
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          margin: '0 0 4px',
        }}
      >
        {label}
      </Text>
      {children ?? (
        <Text style={{ color: DARK, fontSize: 15, margin: 0, fontWeight: 500 }}>
          {value}
        </Text>
      )}
    </div>
  );
}
