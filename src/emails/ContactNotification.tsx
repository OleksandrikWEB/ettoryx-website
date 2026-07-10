import * as React from "react";
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
} from "react-email";

export interface ContactNotificationProps {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}

const GOLD = "#C09B5B";
const DARK = "#0A0A0A";
const SURFACE = "#F9F9F9";
const MUTED = "#6B7280";

export function ContactNotification({
  name,
  email,
  phone,
  service,
  budget,
  message,
}: ContactNotificationProps) {
  return (
    <Html lang="uk">
      <Head />
      <Body style={{ backgroundColor: SURFACE, fontFamily: "'Helvetica Neue', Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", backgroundColor: "#ffffff" }}>

          {/* Header */}
          <Section style={{ backgroundColor: DARK, padding: "28px 40px" }}>
            <Text style={{ color: GOLD, fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>
              ettoryx
            </Text>
          </Section>

          {/* Title bar */}
          <Section style={{ borderLeft: `4px solid ${GOLD}`, padding: "20px 40px", backgroundColor: "#fff" }}>
            <Heading as="h1" style={{ fontSize: 20, color: DARK, margin: 0, fontWeight: 700 }}>
              Нова заявка з сайту
            </Heading>
            <Text style={{ color: MUTED, fontSize: 13, margin: "4px 0 0" }}>
              Отримано через форму ettoryx.com
            </Text>
          </Section>

          <Hr style={{ margin: 0, borderColor: "#E5E7EB" }} />

          {/* Contact fields */}
          <Section style={{ padding: "28px 40px" }}>
            <Row>
              <Column style={{ width: "50%", paddingRight: 12, verticalAlign: "top" }}>
                <Field label="Ім'я" value={name} />
              </Column>
              <Column style={{ width: "50%", paddingLeft: 12, verticalAlign: "top" }}>
                <Field label="Email">
                  <Link href={`mailto:${email}`} style={{ color: GOLD, fontSize: 15 }}>
                    {email}
                  </Link>
                </Field>
              </Column>
            </Row>

            {phone && (
              <Row style={{ marginTop: 16 }}>
                <Column>
                  <Field label="Телефон / Месенджер" value={phone} />
                </Column>
              </Row>
            )}

            {service && (
              <Row style={{ marginTop: 16 }}>
                <Column style={{ width: "50%", paddingRight: 12, verticalAlign: "top" }}>
                  <Field label="Послуга / Напрямок" value={service} />
                </Column>
                {budget && (
                  <Column style={{ width: "50%", paddingLeft: 12, verticalAlign: "top" }}>
                    <Field label="Бюджет" value={budget} />
                  </Column>
                )}
              </Row>
            )}

            <Hr style={{ margin: "24px 0", borderColor: "#E5E7EB" }} />

            {/* Message */}
            <Text style={{ color: MUTED, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>
              Повідомлення
            </Text>
            <Section style={{ backgroundColor: SURFACE, borderRadius: 8, padding: "16px 20px" }}>
              <Text style={{ color: DARK, fontSize: 15, lineHeight: 1.6, margin: 0, whiteSpace: "pre-wrap" }}>
                {message}
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{ backgroundColor: DARK, padding: "20px 40px" }}>
            <Text style={{ color: "#6B7280", fontSize: 12, margin: 0 }}>
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
      <Text style={{ color: MUTED, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 4px" }}>
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
